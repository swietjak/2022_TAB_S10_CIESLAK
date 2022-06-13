using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehiclesAPI.Models;
using VehiclesAPI.Dtos;
using VehiclesAPI.Extensions;

namespace VehiclesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RentalController : ControllerBase
    {
        private readonly WorldContext context;

        public RentalController(WorldContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public IActionResult Post([FromBody] CreateRentalDto value)
        {

            var existingReservation = this.context.Reservations.FirstOrDefault(existingReservation => existingReservation.Id.Equals(value.ReservationId));
            if (existingReservation == null)
            {
                return StatusCode(400, "Rental with that reservation ID doesn't exist");
            }

            Rental newRental = new Rental
            {
                Date = value.Date,
                Description = value.Description,
                MeterIndication = value.meterIndicator,
                ReservationId = existingReservation.Id
            };

            this.context.Rentals.Add(newRental);
            try
            {
                this.context.SaveChanges();
                return StatusCode(201, value);
            }
            catch
            {
                return StatusCode(400, "Rental cannot start");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRental(int id, UpdateRentalDto value)
        {
            var existingRental = await this.context.Rentals.FindAsync(id);
            if (existingRental == null)
            {
                return NotFound();
            }

            existingRental.Description = value.Description;

            existingRental.MeterIndication = value.MeterIndication;

            try
            {
                await this.context.SaveChangesAsync();
                return StatusCode(201, "Rental updated");
            }
            catch
            {
                return StatusCode(400, "something went wrong");
            }
        }


        [HttpGet("care-taker-rentals/{careTakerId}")]
        public ActionResult<IEnumerable<GetCareTakerRentalsDto>> GetCareTakerRentals(int careTakerId)
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

            var careTakerRentals = this.context.Reservations
            .Where(reservation => careTakerVehicles.Any(vehicleId => vehicleId == reservation.Id) || isUserAdmin)
            .Include(reservation => reservation.Vehicle)
            .Include(reservation => reservation.Rental)
            .Include(reservation => reservation.Worker)
            .Include(reservation => reservation.Rental)
            .ThenInclude(rental => rental.VehicleReturn)
            .Where(reservation => reservation.Rental.VehicleReturn == null)
            .Select(reservation => reservation.AsGetCareTakerRentalsDto())
            .ToList();

            return careTakerRentals;
        }
    }
}
