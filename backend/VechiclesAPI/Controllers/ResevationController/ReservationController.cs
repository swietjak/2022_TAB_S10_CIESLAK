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
            Reservation newReservation = new Reservation();
            newReservation.Id=this.context.Reservations.Count()+1;
   
            newReservation.DateFrom=value.DateFrom;
            newReservation.DateTo=value.DateTo;
               
            if(this.context.Workers.FirstOrDefault(existingUser => existingUser.Id.Equals(value.WorkerId))!=null)
            {
                newReservation.WorkerId=value.WorkerId;
            }
            if(this.context.Vehicles.FirstOrDefault(existingVehicle => existingVehicle.Id.Equals(value.VehicleId))!=null)
            {
                newReservation.VehicleId=value.VehicleId;
            }
            if(value.Description!=null)
            {
                newReservation.Description=value.Description;
            }
            else
            {
                newReservation.Description="none";
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