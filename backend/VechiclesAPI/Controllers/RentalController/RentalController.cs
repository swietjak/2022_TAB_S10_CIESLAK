using Microsoft.AspNetCore.Mvc;
using VehiclesAPI.Models;
using VehiclesAPI.Dtos;

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
            Rental newRental = new Rental{Date=value.Date,
            Description=value.Description,
            MeterIndication=value.MeterIndication
            };
            
            var existingReservation = this.context.Reservations.FirstOrDefault(existingReservation => existingReservation.Id.Equals(value.ReservationId));
            if(existingReservation!=null)
            {
                newRental.ReservationId=value.ReservationId;
            }else{
                return StatusCode(400,"Rental with that reservation ID doesn't exist");
            }

            this.context.Rentals.Add(newRental);
            try
            {
                this.context.SaveChanges();
                return StatusCode(201,value);
            }
            catch{
                return StatusCode(400,"Rental cannot start");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRental(int id, UpdateRentalDto value)
        {
            var existingRental = await this.context.Rentals.FindAsync(id);
            if(existingRental==null)
            {
                return NotFound();
            }

            existingRental.Description=value.Description;

            existingRental.MeterIndication=value.MeterIndication;

            try{
                await this.context.SaveChangesAsync();
                return StatusCode(201,"Rental updated");
            }catch
            {
                return StatusCode(400,"something went wrong");
            }
        }
    }
}
