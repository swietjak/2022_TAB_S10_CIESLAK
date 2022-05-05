using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using VehiclesAPI.Models;
using VehiclesAPI.Dtos;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace VehiclesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly WorldContext context;
        private readonly UserManager<Worker> userManager;

        public RegisterController(WorldContext context, UserManager<Worker> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterDto value)
        {
            if(ModelState.IsValid){
                var existingUser = await this.userManager.FindByEmailAsync(value.Email);
                if(existingUser==null){
                    Worker newWorker = new Worker();
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
                    
                    IdentityResult result = await userManager.CreateAsync(newWorker,value.Password);

                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(newWorker, "Worker");
                        return Created("", value);
                    }
                    
                }  
            }
            return StatusCode(400,"bibipoopoo");
        }
    }
}
