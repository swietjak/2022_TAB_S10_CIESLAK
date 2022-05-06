using Microsoft.AspNetCore.Mvc;
using VehiclesAPI.Dtos;
using VehiclesAPI.Models;

namespace VehiclesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EquipmentController : ControllerBase
    {
        private readonly WorldContext context;

        public EquipmentController(WorldContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IEnumerable<GetEquipmentsDto> GetEquipments()
        {
            return this.context.Equipments.Select(e => new GetEquipmentsDto { id = e.Id, name = e.Name }).ToList();
        }

        [HttpPost]
        public IActionResult CreateEquipment(string name, string? description)
        {
            Equipment newEquipment = new Equipment { Id = 0, Name = name, Description = string.IsNullOrEmpty(description) ? "" : description };

            this.context.Equipments.Add(newEquipment);
            try
            {
                this.context.SaveChanges();
                return StatusCode(201);
            }
            catch
            {
                return StatusCode(400, "Failed");
            }
        }

        [HttpPut]
        public IActionResult EditEquipment(string name, string? description)
        {
            Equipment newEquipment = new Equipment { Id = 0, Name = name, Description = string.IsNullOrEmpty(description) ? "" : description };

            this.context.Equipments.Add(newEquipment);
            try
            {
                this.context.SaveChanges();
                return StatusCode(201);
            }
            catch
            {
                return StatusCode(400, "Failed");
            }
        }
    }
}