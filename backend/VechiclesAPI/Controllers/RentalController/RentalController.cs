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
            Rental newRental = new Rental();
            newRental.Id=this.context.Rentals.Count()+1;
            newRental.Date=value.Date;
            newRental.Description=value.Description;
            
            if(this.context.Reservations.FirstOrDefault(existingReservation => existingReservation.Id.Equals(value.ReservationId))!=null)
            {
                newRental.ReservationId=value.ReservationId;
            }

            newRental.MeterIndication=value.MeterIndication;

            if(value.VehicleReturnId.HasValue)
            {
                newRental.VehicleReturnId=value.VehicleReturnId;
            }
            else{
                newRental.VehicleReturnId=null;
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

            if(value.VehicleReturnId.HasValue)
            {
                existingRental.VehicleReturnId=value.VehicleReturnId;
            }
            else{
                existingRental.VehicleReturnId=null;
            }
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
