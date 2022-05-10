using Microsoft.AspNetCore.Mvc;
using VehiclesAPI.Models;
using VehiclesAPI.Dtos;

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
            VehicleReturn newReturn = new VehicleReturn{Date=value.Date,
            Description=value.Description,
            MeterIndication=value.MeterIndication,
            FuelConsumption=value.FuelConsumption
            };

            var existingRental = this.context.Rentals.FirstOrDefault(existingRental => existingRental.Id.Equals(value.RentalId));
             if(existingRental!=null)
            {
                newReturn.RentalId=value.RentalId;
            }else{
                return StatusCode(400, "Rental with this ID doesn't exist");
            }

            this.context.VehicleReturns.Add(newReturn);
            try
            {
                this.context.SaveChanges();
                return StatusCode(201,value);
            }
            catch{
                return StatusCode(400,"Failed reservation");
            }

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateVehicleReturn(int id, UpdateVehicleReturnDto value)
        {
            var existingReturn = await this.context.VehicleReturns.FindAsync(id);
            if(existingReturn==null)
            {
                return NotFound();
            }

            existingReturn.Description=value.Description;

            try{
                await this.context.SaveChangesAsync();
                return StatusCode(201,"Return updated");
            }catch
            {
                return StatusCode(400,"something went wrong");
            }
        }
    }
}