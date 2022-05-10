using Microsoft.AspNetCore.Mvc;
using VehiclesAPI.Models;
using VehiclesAPI.Dtos;

namespace VehiclesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly WorldContext context;

        public LoginController(WorldContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public IActionResult Post([FromBody] LoginDto value)
        {
            var worker = this.context.Workers.FirstOrDefault(worker => worker.Email.Equals(value.login));
            if(worker != null)
            {
                if(!worker.Password.Equals(value.password))
                {
                    return StatusCode(400, "Wrong password");
                }
                UserPermisions userPermisions = new UserPermisions();
                if(worker.Isadmin.HasValue){
                    userPermisions.isAdmin=worker.Isadmin.Value;
                }else{
                    userPermisions.isAdmin=false;
                }
                if(worker.Hascarepermissions.HasValue){
                    userPermisions.hasCarePermissions=worker.Hascarepermissions.Value;
                }else{
                    userPermisions.hasCarePermissions=false;
                }
                
                return StatusCode(201, new LoginResponseDto{userId=worker.Id,name=worker.FirstName,surname=worker.Surname,userPermisions=userPermisions});
            }
            return StatusCode(400,"User with that login doesn't exist");

        } 
    }

}