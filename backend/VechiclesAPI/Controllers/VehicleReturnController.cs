using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehiclesAPI.Models;
using VehiclesAPI.Dtos;
using VehiclesAPI.Extensions;

namespace VehiclesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleReturnController : ControllerBase
    {
        private readonly WorldContext context;

        public VehicleReturnController(WorldContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public IActionResult Post([FromBody] CreateVehicleReturnDto value)
        {

            var existingRental = this.context.Rentals.FirstOrDefault(existingRental => existingRental.Id.Equals(value.RentalId));
            if (existingRental == null)
            {
                return StatusCode(400, "Rental with this ID doesn't exist");
            }

            VehicleReturn newReturn = new VehicleReturn
            {
                Date = value.Date,
                Description = value.Description,
                MeterIndication = value.MeterIndication,
                FuelConsumption = value.FuelConsumption,
                RentalId = existingRental.Id
            };

            this.context.VehicleReturns.Add(newReturn);
            try
            {
                this.context.SaveChanges();
                return StatusCode(201, value);
            }
            catch
            {
                return StatusCode(400, "Failed reservation");
            }

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateVehicleReturn(int id, UpdateVehicleReturnDto value)
        {
            var existingReturn = await this.context.VehicleReturns.FindAsync(id);
            if (existingReturn == null)
            {
                return NotFound();
            }

            existingReturn.Description = value.Description;

            try
            {
                await this.context.SaveChangesAsync();
                return StatusCode(201, "Return updated");
            }
            catch
            {
                return StatusCode(400, "something went wrong");
            }
        }

        [HttpGet("care-taker-archive/{careTakerId}")]
        public ActionResult<IEnumerable<GetCareTakerArchiveDto>> GetCareTakerArchive(int careTakerId)
        {
            var existingUser = this.context.Workers.Where(worker => worker.Id == careTakerId).FirstOrDefault();

            if (existingUser == null)
            {
                return StatusCode(400, "No such user");
            }

            var isUserAdmin = existingUser?.Isadmin ?? false;

            var careTakerVehicles = this.context.VehiclesCares
            .Where(care => care.WorkerId == careTakerId)
            .Select(care => care.VehicleId)
            .ToList();

            var careTakerArchives = this.context.Reservations
            .Where(reservation => isUserAdmin || careTakerVehicles.Any(vehicleId => vehicleId == reservation.Id))
            .Include(reservation => reservation.Vehicle)
            .Include(reservation => reservation.Rental)
            .Include(reservation => reservation.Worker)
            .Join(this.context.VehicleReturns, reservation => reservation.Rental.Id, vehicleReturn => vehicleReturn.RentalId, (reservation, vehicleReturn) => new { reservation, vehicleReturn })
            .Select(combined => combined.reservation.AsGetCareTakerArchiveDto(combined.vehicleReturn))
            .ToList();

            return careTakerArchives;
        }
    }
}