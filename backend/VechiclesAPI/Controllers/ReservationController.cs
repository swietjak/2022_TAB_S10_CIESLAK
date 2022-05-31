using Microsoft.AspNetCore.Mvc;
using VehiclesAPI.Models;
using VehiclesAPI.Dtos;
using VehiclesAPI.Extensions;
using Microsoft.EntityFrameworkCore;
namespace VehiclesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly WorldContext context;

        public ReservationController(WorldContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public IActionResult Post([FromBody] CreateReservationDto value)
        {

            var existingUser = this.context.Workers.FirstOrDefault(existingUser => existingUser.Id.Equals(value.workerId));
            if (existingUser == null)
            {
                return StatusCode(400, "Worker with this ID doesn't exist");
            }


            var existingVehicle = this.context.Vehicles.FirstOrDefault(existingVehicle => existingVehicle.Id.Equals(value.vehicleId));
            if (existingVehicle == null)
            {
                return StatusCode(400, "Vehicle with this ID doesn't exist");
            }

            Reservation newReservation = new Reservation
            {
                DateFrom = value.dateFrom,
                DateTo = value.dateTo,
                Description = value.description,
                WorkerId = existingUser.Id,
                VehicleId = existingVehicle.Id
            };

            this.context.Reservations.Add(newReservation);
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

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReseravtion(int id)
        {
            var existingReservation = await this.context.Reservations.FindAsync(id);
            if (existingReservation == null)
            {
                return StatusCode(400, "Reservation with that ID doesn't exist");
            }

            this.context.Reservations.Remove(existingReservation);
            await this.context.SaveChangesAsync();
            return StatusCode(201, "Reservation cancelled successfully");
        }

        [HttpGet("user-reservations/{userId}")]
        public IEnumerable<GetUserReservationsDto> GetUserReseravtions(int userId)
        {
            var userReservations = this.context.Reservations
            .Where(reservation => reservation.WorkerId == userId)
            .Join(this.context.Vehicles, reservation => reservation.VehicleId, vehicle => vehicle.Id, (reservation, vehicle) => new { reservation, vehicle })
            .GroupJoin(this.context.Rentals, combinedEntry => combinedEntry.reservation.Id, rental => rental.ReservationId, (combinedEntry, rental) => new { reservation = combinedEntry.reservation, vehicle = combinedEntry.vehicle, rental = rental })
            .SelectMany(combinedEntry => combinedEntry.rental.DefaultIfEmpty(), (combined, rental) => new { reservation = combined.reservation, vehicle = combined.vehicle, rental })
            .GroupJoin(this.context.VehicleReturns, combinedEntry => combinedEntry.rental == null ? 0 : combinedEntry.rental.Id, vehicleReturn => vehicleReturn.RentalId, (combinedEntry, vehicleReturn) => new { reservation = combinedEntry.reservation, vehicle = combinedEntry.vehicle, rental = combinedEntry.rental, vehicleReturn })
            .SelectMany(combinedEntry => combinedEntry.vehicleReturn.DefaultIfEmpty(), (combined, vehicleReturn) => combined.reservation.AsGetReservationsDto(combined.vehicle, combined.rental, vehicleReturn))
            .ToList();

            return userReservations;
        }

        [HttpGet("care-taker-reservations/{careTakerId}")]
        public ActionResult<IEnumerable<GetCareTakerReservationsDto>> GetCareTakerReseravtions(int careTakerId)
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

            var careTakerReservations = this.context.Reservations
            .Where(reservation => isUserAdmin || careTakerVehicles.Any(vehicleId => vehicleId == reservation.Id))
            .Include(reservation => reservation.Worker)
            .Include(reservation => reservation.Vehicle)
            .Include(reservation => reservation.Rental)
            .Where(reservation => reservation.Rental == null)
            .Select(reservation => reservation.AsGetCareTakerReservationsDto())
            .ToList();

            return careTakerReservations;
        }
    }
}