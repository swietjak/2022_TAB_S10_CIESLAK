using Microsoft.AspNetCore.Mvc;
using VehiclesAPI.Models;
using VehiclesAPI.Dtos;
using VehiclesAPI.Extensions;
using Microsoft.EntityFrameworkCore;

namespace VehiclesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleController : ControllerBase
    {
        private readonly WorldContext context;

        public VehicleController(WorldContext context)
        {
            this.context = context;
        }


        [HttpGet(Name = "GetVehicles")]
        public IEnumerable<GetVehiclesDto> GetVehicles(string? brand, bool? showDeleted)
        {
            return (
                from v in context.Vehicles
                where !v.IsDeleted
                select new GetVehiclesDto
                {
                    id = v.Id,
                    vin = v.Vin,
                    brand = v.Brand,
                    model = v.Model,
                    equipments = (
                        from i in context.VehicleEquipments
                        join e in context.Equipments
                        on i.EquipmentId equals e.Id
                        where i.VehicleId == v.Id
                        select e.Name
                        ).ToArray()
                }
                ).OrderBy(v => v.brand)
                .Where(v => v.brand.Contains(string.IsNullOrEmpty(brand) ? "" : brand))
                .ToList();
        }

        [HttpGet("available")]
        public IEnumerable<GetVehiclesDto> GetAvailableVehicles(string? brand, [FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var reservations = GetAllCurrentReservations(startDate, endDate);
            var services = GetAllCurrentServices(startDate, endDate);
            var absences = GetAllCurrentAbsence(startDate, endDate);

            var vehicles = this.context.Vehicles
            .Include(vehicle => vehicle.VehicleEquipments)
                .ThenInclude(ve => ve.Equipment)
            .Where(v => !v.IsDeleted)
            .Where(v => v.Brand.Contains(string.IsNullOrEmpty(brand) ? "" : brand))
            .Where(v => !reservations.Contains(v.Id))
            .Where(v => !services.Contains(v.Id))
            .Where(v => !absences.Contains(v.Id))
            .OrderBy(v => v.Brand)
            .Select(v => v.AsGetVehicleDto())
            .ToList();

            return vehicles;
        }

        private IEnumerable<int> GetAllCurrentReservations(DateTime startDate, DateTime endDate)
        {
            return (
                from r in context.Reservations
                where r.DateTo >= startDate && r.DateFrom <= endDate
                select r.VehicleId
            ).ToList().Distinct();
        }

        private IEnumerable<int> GetAllCurrentServices(DateTime startDate, DateTime endDate)
        {
            var currentServices = this.context.ServiceExecutions
            .Include(execution => execution.VehicleCare)
            .Where(execution => execution.EndDate >= startDate && execution.StartDate <= endDate && !execution.IsFinished)
            .Select(execution => execution.VehicleCare.VehicleId)
            .Distinct()
            .ToList();

            return currentServices;
        }

        private IEnumerable<int> GetAllCurrentAbsence(DateTime startDate, DateTime endDate)
        {
            return (
                from a in context.CarAbsenses
                where a.EndDate >= startDate && a.StartDate <= endDate
                select a.VehicleId
            ).ToList().Distinct();
        }

        [HttpGet("{id}")]
        public GetVehicleDetailsDto GetVehiclesById(int id)
        {
            var vehicleDetails = this.context.Vehicles
            .Where(vehicle => vehicle.Id == id)
            .Include(vehicle => vehicle.VehicleEquipments)
            .ThenInclude(ve => ve.Equipment)
            .Select(vehicle => vehicle.AsGetVehicleDetailsDto()).First();

            return vehicleDetails;
        }

        [HttpGet("{vehicleId}/statistics")]
        public GetVehicleStatisticsDto GetVehicleStatisticsById(int vehicleId)
        {
            var vehicleDetails = this.context.Vehicles
            .Where(vehicle => vehicle.Id == vehicleId)
            .Include(vehicle => vehicle.VehiclesCares)
                .ThenInclude(care => care.ServiceExecutions)
                    .ThenInclude(execution => execution.ServicePricing)
            .Include(vehicle => vehicle.Reservations)
                .ThenInclude(reservstion => reservstion.Rental)
                    .ThenInclude(rental => rental.VehicleReturn)
            .Select(vehicle => vehicle.AsGetVehicleStatisticsDto()).First();

            return vehicleDetails;
        }

        [HttpGet("care-taker-vehicles/{id}")]
        public IEnumerable<GetCareTakerVehiclesDto> GetCareTakerVehicles(int id)
        {
            var vehicles = this.context.VehiclesCares
            .Include(care => care.Vehicle)
                .ThenInclude(vehicle => vehicle.VehicleEquipments)
                    .ThenInclude(eq => eq.Equipment)
            .Where(care => care.WorkerId == id)
            .Include(care => care.Vehicle)
                .ThenInclude(vehicle => vehicle.Reservations)
                    .ThenInclude(reservation => reservation.Rental)
                        .ThenInclude(rental => rental.VehicleReturn)
            .Include(care => care.ServiceExecutions)
            .Select(care => care.Vehicle.AsGetCareTakerVehicleDto(care))
            .ToList();
            return vehicles;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] CreateVehicleDto value)
        {
            var newVehicle = value.AsVehicle();
            this.context.Vehicles.Add(newVehicle);

            try
            {
                await this.context.SaveChangesAsync();
            }
            catch (System.Exception e)
            {
                return StatusCode(400, e.StackTrace);
            }

            var vehicleEquipmentList = value.equipments.Select(e => new VehicleEquipment { Amount = e.amount, EquipmentId = e.id, VehicleId = newVehicle.Id });

            try
            {
                await this.context.VehicleEquipments.AddRangeAsync(vehicleEquipmentList);
                await this.context.SaveChangesAsync();
            }
            catch (System.Exception e)
            {
                return StatusCode(400, e.StackTrace);
            }

            var careTaker = await this.context.Workers.FirstOrDefaultAsync(worker => worker.Id == value.careTakerId);

            if (careTaker == null) return StatusCode(201);

            var newVehicleCare = new VehiclesCare
            {
                StartDate = DateTime.UtcNow,
                VehicleId = newVehicle.Id,
                WorkerId = careTaker.Id
            };

            await this.context.VehiclesCares.AddAsync(newVehicleCare);

            try
            {
                await this.context.SaveChangesAsync();
                return StatusCode(201);
            }
            catch (System.Exception e)
            {
                return StatusCode(400, e.StackTrace);
            }
        }

        private async Task<bool> DeleteEquipmentsRelations(NewEquipmentEntry[] valueEquipments, ICollection<VehicleEquipment> vehicleEquipments, int vehicleId)
        {
            try
            {
                var deletableVehicles = vehicleEquipments
                .Where(vehicleEquipment => !valueEquipments.Any(valueEquipment => valueEquipment.id == vehicleEquipment.EquipmentId) && vehicleEquipment.VehicleId == vehicleId)
                .ToList();

                foreach (var item in deletableVehicles)
                {
                    this.context.Remove(item);
                }
                await this.context.SaveChangesAsync();
                return true;
            }
            catch (System.Exception)
            {
                return false;
            }

        }

        private async Task<bool> EditEquipmentsRelations(NewEquipmentEntry[] valueEquipments, ICollection<VehicleEquipment> vehicleEquipments, int vehicleId)
        {
            try
            {
                var editableVehicles = vehicleEquipments
                .Where(vehicleEquipment => valueEquipments.Any(valueEquipment => valueEquipment.id == vehicleEquipment.EquipmentId) && vehicleEquipment.VehicleId == vehicleId)
                .ToList();
                foreach (var item in editableVehicles)
                {
                    item.Amount = valueEquipments.Where(eq => eq.id == item.EquipmentId).Sum(eq => eq.amount);
                    this.context.Update(item);
                }
                await this.context.SaveChangesAsync();
                return true;
            }
            catch (System.Exception)
            {
                return false;
            }

        }

        private async Task<bool> AddEquipmentsRelations(NewEquipmentEntry[] valueEquipments, ICollection<VehicleEquipment> vehicleEquipments, int vehicleId)
        {
            try
            {
                var addableVehicles = valueEquipments.Where(valueEquipment => !vehicleEquipments.Any(vehicleEquipment => valueEquipment.id == vehicleEquipment.EquipmentId)).ToList();
                foreach (var item in addableVehicles)
                {
                    var newVehicleEq = new VehicleEquipment
                    {
                        Amount = item.amount,
                        VehicleId = vehicleId,
                        EquipmentId = item.id
                    };
                    await this.context.VehicleEquipments.AddAsync(newVehicleEq);
                }
                await this.context.SaveChangesAsync();
                return true;
            }
            catch (System.Exception)
            {
                return false;
            }

        }

        [HttpPut("{vehicleId}")]
        public async Task<IActionResult> EditVehicle(int vehicleId, [FromBody] EditVehicleDto value)
        {
            var existingVehicle = this.context.Vehicles
            .Where(vehicle => vehicle.Id == vehicleId)
            .Include(vehicle => vehicle.VehicleEquipments).FirstOrDefault();

            if (existingVehicle == null) return StatusCode(400, "No such vehicle");

            var res = await DeleteEquipmentsRelations(value.equipments, existingVehicle.VehicleEquipments, existingVehicle.Id);

            if (!res) return StatusCode(400, "Something wrong with deleting");

            res = await EditEquipmentsRelations(value.equipments, existingVehicle.VehicleEquipments, existingVehicle.Id);
            if (!res) return StatusCode(400, "Something wrong with editing");

            res = await AddEquipmentsRelations(value.equipments, existingVehicle.VehicleEquipments, existingVehicle.Id);
            if (!res) return StatusCode(400, "Something wrong with adding");

            existingVehicle.Brand = value.brand;
            existingVehicle.EngineCapacity = value.engineCapacity;
            existingVehicle.EnginePower = value.enginePower;
            existingVehicle.Model = value.model;
            existingVehicle.Vin = value.vin;

            try
            {
                this.context.Vehicles.Update(existingVehicle);
                await this.context.SaveChangesAsync();
            }
            catch (System.Exception e)
            {
                return StatusCode(400, e.StackTrace);
            }

            return StatusCode(200);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var existingVehicle = this.context.Vehicles.FirstOrDefault(vehicle => vehicle.Id == id);

            if (existingVehicle == null) return StatusCode(400, "No such vehicle found");

            existingVehicle.IsDeleted = true;

            try
            {
                await this.context.SaveChangesAsync();
                return StatusCode(201);
            }
            catch (System.Exception)
            {
                return StatusCode(400);
            }
        }
    }
}