using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using VehiclesAPI.Models;
using VehiclesAPI.Dtos;


namespace VehiclesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly WorldContext context;

        public RegisterController(WorldContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public IActionResult Register([FromBody] RegisterDto value)
        {
            var existingUser = this.context.Workers.FirstOrDefault(existingUser => existingUser.Email.Equals(value.Email));
            if(existingUser==null)
            {
                Worker newWorker = new Worker();
                newWorker.Id=this.context.Workers.Count();
                newWorker.Email=value.Email;
                newWorker.FirstName=value.FirstName;
                newWorker.Surname=value.LastName;
                newWorker.Password=value.Password;
                newWorker.Pesel=value.Pesel;

                if(value.Hascarepermissions.HasValue){
                    newWorker.Hascarepermissions=value.Hascarepermissions.HasValue;
                }else 
                {
                    newWorker.Hascarepermissions=false;
                }
                if(value.Isadmin.HasValue){
                   newWorker.Isadmin=value.Isadmin.HasValue;
                }else 
                {
                   newWorker.Isadmin=false;
                }
                this.context.Workers.Add(newWorker);
                try
                {
                    this.context.SaveChanges();
                    return StatusCode(201,value);
                }
                catch
                {
                    return StatusCode(400,"Failed registration");
                }
            }
            else
            {
                return StatusCode(400,"User with this e-mail already exists");
            }
        }
    }
}
