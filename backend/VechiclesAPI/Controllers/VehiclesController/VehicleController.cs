using Microsoft.AspNetCore.Mvc;
using VehiclesAPI.Models;
using VehiclesAPI.Dtos;

namespace VehiclesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleController : ControllerBase
    {
        private readonly WorldContext context;

        public VehicleController(WorldContext context)
        {
            this.context = context;
        }
        

        [HttpGet(Name = "GetVehicles")]
        public IEnumerable<GetVehiclesDto> GetVehicles(string? brand)
        {
            return (
                from v in context.Vehicles
                select new GetVehiclesDto {
                    id = v.Id,
                    vin = v.Vin,
                    brand = v.Brand,
                    model = v.Model,
                    equipments = (
                        from i in context.VehicleEquipments
                        join e in context.Equipments 
                        on i.EquipmentId equals e.Id
                        where i.VehicleId == v.Id 
                        select e.Name
                        ).ToArray()
                } ).OrderBy(v => v.brand)
                .Where(v => v.brand.Contains(string.IsNullOrEmpty(brand) ? "" : brand))
                .ToList();
        }
        [HttpGet("{id}")]
        public GetVehiclesDto GetVehiclesById(int id)
        {
            return (
                from v in context.Vehicles
                where v.Id == id
                select new GetVehiclesDto {
                    id = v.Id,
                    vin = v.Vin,
                    brand = v.Brand,
                    model = v.Model,
                    equipments = (
                        from i in context.VehicleEquipments
                        join e in context.Equipments 
                        on i.EquipmentId equals e.Id
                        where i.VehicleId == v.Id 
                        select e.Name
                        ).ToArray()
                } ).First();
        }
    }
}