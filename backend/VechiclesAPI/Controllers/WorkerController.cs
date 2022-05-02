using Microsoft.AspNetCore.Mvc;
using VechiclesAPI.Models;

namespace VechiclesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WorkerController : ControllerBase
    {
        private readonly WorldContext context;

        public WorkerController(WorldContext context)
        {
            this.context = context;
        }

        [HttpGet(Name = "GetWorkers")]
        public IEnumerable<Worker> Get()
        {
            return context.Workers.ToList();
        }
    }
}