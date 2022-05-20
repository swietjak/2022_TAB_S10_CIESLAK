using Microsoft.AspNetCore.Mvc;
using VehiclesAPI.Models;
using VehiclesAPI.Dtos;
using VehiclesAPI.Extensions;

namespace VehiclesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServiceExecutionController : ControllerBase
    {
        private readonly WorldContext context;

        public ServiceExecutionController(WorldContext context)
        {
            this.context = context;
        }


        [HttpGet(Name = "GetServiceExecution")]
        public IEnumerable<GetServiceExecutionDto> GetServiceExecution(DateTime? startPeriod, DateTime? endPeriod)
        {
            return (
                from s in context.ServiceExecutions
                join o in context.OfferedServices
                on s.OfferedServiceId equals o.Id
                join v in context.Vehicles
                on s.VehicleId equals v.Id
                select new GetServiceExecutionDto
                {
                    id = s.Id,
                    vehicleId = s.VehicleId,
                    vechicleBrand = v.Brand,
                    vechicleModel = v.Model,
                    vin = v.Vin,
                    startDate = s.StartDate,
                    endDate = s.EndDate,
                    description = s.Description,
                    isFinished = s.IsFinished,
                    vehicleCareId = s.VehicleCareId,
                    vehicleCare = (
                        from c in context.VehiclesCares
                        join w in context.Workers
                        on c.WorkerId equals w.Id
                        where c.Id == s.VehicleCareId
                        select new ServiceVehicleCare
                        {
                            workerId = c.WorkerId,
                            workerName = w.FirstName,
                            workerSurname = w.Surname
                        }
                    ).First(),
                    offeredServiceId = s.OfferedServiceId,
                    serviceName = (
                        from e in context.Services
                        where e.Id == o.ServiceId
                        select e.Name
                        ).First(),
                    serviceExecutionerName = (
                        from e in context.ExternalServicers
                        where e.Id == o.ExternalServicerId
                        select e.Name
                        ).First(),
                }
                ).OrderBy(s => s.startDate)
                .Where(s => (startPeriod != null ? startPeriod : DateTime.UtcNow) >= s.startDate)
                .Where(s => (endPeriod == null || endPeriod <= s.endDate))
                .ToList();
        }



        [HttpGet("VechicleId")]
        public IEnumerable<GetServiceExecutionDto> GetServiceExecutionByVechicleId(int vechicleId)
        {
            return (
                from s in context.ServiceExecutions
                join o in context.OfferedServices
                on s.OfferedServiceId equals o.Id
                join v in context.Vehicles
                on s.VehicleId equals v.Id
                where s.VehicleId == vechicleId
                select new GetServiceExecutionDto
                {
                    id = s.Id,
                    vehicleId = s.VehicleId,
                    vechicleBrand = v.Brand,
                    vechicleModel = v.Model,
                    vin = v.Vin,
                    startDate = s.StartDate,
                    endDate = s.EndDate,
                    description = s.Description,
                    isFinished = s.IsFinished,
                    vehicleCareId = s.VehicleCareId,
                    vehicleCare = (
                        from c in context.VehiclesCares
                        join w in context.Workers
                        on c.WorkerId equals w.Id
                        where c.Id == s.VehicleCareId
                        select new ServiceVehicleCare
                        {
                            workerId = c.WorkerId,
                            workerName = w.FirstName,
                            workerSurname = w.Surname
                        }
                    ).First(),
                    offeredServiceId = s.OfferedServiceId,
                    serviceName = (
                        from e in context.Services
                        where e.Id == o.ServiceId
                        select e.Name
                        ).First(),
                    serviceExecutionerName = (
                        from e in context.ExternalServicers
                        where e.Id == o.ExternalServicerId
                        select e.Name
                        ).First(),
                }
                ).OrderBy(s => s.startDate)
                .ToList();
        }

        [HttpGet("{id}")]
        public GetServiceExecutionDto GetServiceExecutionById(int id)
        {
            return (
                from s in context.ServiceExecutions
                join o in context.OfferedServices
                on s.OfferedServiceId equals o.Id
                join v in context.Vehicles
                on s.VehicleId equals v.Id
                where s.Id == id
                select new GetServiceExecutionDto
                {
                    id = s.Id,
                    vehicleId = s.VehicleId,
                    vechicleBrand = v.Brand,
                    vechicleModel = v.Model,
                    vin = v.Vin,
                    startDate = s.StartDate,
                    endDate = s.EndDate,
                    description = s.Description,
                    isFinished = s.IsFinished,
                    vehicleCareId = s.VehicleCareId,
                    vehicleCare = (
                        from c in context.VehiclesCares
                        join w in context.Workers
                        on c.WorkerId equals w.Id
                        where c.Id == s.VehicleCareId
                        select new ServiceVehicleCare
                        {
                            workerId = c.WorkerId,
                            workerName = w.FirstName,
                            workerSurname = w.Surname
                        }
                    ).First(),
                    offeredServiceId = s.OfferedServiceId,
                    serviceName = (
                        from e in context.Services
                        where e.Id == o.ServiceId
                        select e.Name
                        ).First(),
                    serviceExecutionerName = (
                        from e in context.ExternalServicers
                        where e.Id == o.ExternalServicerId
                        select e.Name
                        ).First(),
                }
                ).First();
        }

        [HttpPost]
        public IActionResult CreateServiceExecution([FromBody] CreateServiceExecutionDto value)
        {
            var newExecution = value.AsServiceExecution();
            try
            {
                this.context.ServiceExecutions.AddRange(newExecution);
                this.context.SaveChanges();
                return StatusCode(201, newExecution.Id);

            }
            catch (System.Exception e)
            {
                return StatusCode(400, e.StackTrace);
            }
        }


    }
}