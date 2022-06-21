using Microsoft.AspNetCore.Mvc;
using VehiclesAPI.Models;

namespace VehiclesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly WorldContext context;

        public ServicesController(WorldContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IEnumerable<object> GetServices()
        {
            return this.context.Services.Select(e => new { id = e.Id, name = e.Name }).ToList();
        }
    }
}