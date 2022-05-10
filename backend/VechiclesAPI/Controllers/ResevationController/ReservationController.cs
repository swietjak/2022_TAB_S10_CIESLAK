using Microsoft.AspNetCore.Mvc;
using VehiclesAPI.Models;
using VehiclesAPI.Dtos;

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
            Reservation newReservation = new Reservation{DateFrom=value.DateFrom,
            DateTo=value.DateTo,
            Description=value.Description
            };
            
            var existingUser = this.context.Workers.FirstOrDefault(existingUser => existingUser.Id.Equals(value.WorkerId));
            if(existingUser!=null)
            {
                newReservation.WorkerId=value.WorkerId;
            }else{
                return StatusCode(400, "Worker with this ID doesn't exist");
            }

            var existingVehicle = this.context.Vehicles.FirstOrDefault(existingVehicle => existingVehicle.Id.Equals(value.VehicleId));
            if(existingVehicle!=null)
            {
                newReservation.VehicleId=value.VehicleId;
            }else{
                return StatusCode(400, "Vehicle with this ID doesn't exist");
            }
            
            this.context.Reservations.Add(newReservation);
            try
            {
                this.context.SaveChanges();
                return StatusCode(201,value);
            }
            catch{
                return StatusCode(400,"Failed reservation");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReseravtion(int id)
        {   
            var existingReservation = await this.context.Reservations.FindAsync(id);
            if(existingReservation==null)
            {
                return StatusCode(400,"Reservation with that ID doesn't exist");
            }

            this.context.Reservations.Remove(existingReservation);
            await this.context.SaveChangesAsync();
            return StatusCode(201,"Reservation cancelled successfully");
        }
    }
}