using Microsoft.AspNetCore.Mvc;
using VehiclesAPI.Models;
using VehiclesAPI.Dtos;
using VehiclesAPI.Extensions;

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
        public IEnumerable<GetVehiclesDto> GetVehicles(string? brand)
        {
            return (
                from v in context.Vehicles
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
                }).OrderBy(v => v.brand)
                .Where(v => v.brand.Contains(string.IsNullOrEmpty(brand) ? "" : brand))
                .ToList();
        }
        
        [HttpGet("available")]
        public IEnumerable<GetVehiclesDto> GetAvailableVehicles(string? brand, [FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            DateOnly start = DateOnly.FromDateTime(startDate);
            DateOnly end = DateOnly.FromDateTime(endDate);
            var reservations = GetAllCurrentReservations(start, end);
            var services = GetAllCurrentServices(start, end);
            return (
                from v in context.Vehicles
                select new GetVehiclesDto {
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
                } ).OrderBy(v => v.brand)
                .Where(v => v.brand.Contains(string.IsNullOrEmpty(brand) ? "" : brand))
                .Where(v =>!reservations.Contains(v.id))
                .Where(v =>!services.Contains(v.id))
                .ToList();
        }

        private IEnumerable<int> GetAllCurrentReservations(DateOnly startDate, DateOnly endDate){
            return (
                from r in context.Reservations
                where r.DateTo >= startDate && r.DateFrom <= endDate
                select r.VehicleId
            ).ToList().Distinct();
        }

        private IEnumerable<int> GetAllCurrentServices(DateOnly startDate, DateOnly endDate){
            return (
                from s in context.ServiceExecutions
                where s.EndDate >= startDate && s.StartDate <= endDate
                select s.VehicleId
            ).ToList().Distinct();
        }
 
        [HttpGet("{id}")]
        public GetVehiclesDto GetVehiclesById(int id)
        {
            return (
                from v in context.Vehicles
                where v.Id == id
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
                }).First();
        }

        [HttpPost]
        public IActionResult CreateVehicle([FromBody] CreateVehicleDto value)
        {
            var newVehicle = value.AsVehicle();
            try
            {
                this.context.Vehicles.Add(newVehicle);
                this.context.SaveChanges();
            }
            catch (System.Exception)
            {
                return StatusCode(400, newVehicle.Id);
            }

            var vehicleEquipmentList = value.equipments.Select(e => new VehicleEquipment { Amount = e.amount, EquipmentId = e.id, VehicleId = newVehicle.Id });

            try
            {
                this.context.VehicleEquipments.AddRange();
                this.context.SaveChanges();
                return StatusCode(201, newVehicle.Id);
            }
            catch (System.Exception)
            {
                return StatusCode(400);
            }
        }
    }
}