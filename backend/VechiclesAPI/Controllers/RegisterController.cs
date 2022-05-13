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
            if (existingUser == null)
            {
                Worker newWorker = new Worker
                {
                    Email = value.Email,
                    FirstName = value.FirstName,
                    Surname = value.LastName,
                    Password = value.Password,
                    Pesel = value.Pesel
                };

                if (value.Hascarepermissions.HasValue)
                {
                    newWorker.Hascarepermissions = value.Hascarepermissions.HasValue;
                }
                else
                {
                    newWorker.Hascarepermissions = false;
                }
                if (value.Isadmin.HasValue)
                {
                    newWorker.Isadmin = value.Isadmin.HasValue;
                }
                else
                {
                    newWorker.Isadmin = false;
                }
                this.context.Workers.Add(newWorker);
                try
                {
                    this.context.SaveChanges();
                    return StatusCode(201, value);
                }
                catch
                {
                    return StatusCode(400, "Failed registration");
                }
            }
            else
            {
                return StatusCode(400, "User with this e-mail already exists");
            }
        }
    }
}
