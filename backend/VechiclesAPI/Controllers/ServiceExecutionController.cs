using Microsoft.AspNetCore.Mvc;
using VehiclesAPI.Models;
using VehiclesAPI.Dtos;
using VehiclesAPI.Extensions;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet("{vehicleId}")]
        public IEnumerable<GetServiceExecutionDto> GetServiceExecutionByVechicleId(int vehicleId)
        {
            var serviceExecutions = this.context.ServiceExecutions
            .Include(execution => execution.VehicleCare)
            .Where(execution => execution.VehicleCare.VehicleId == vehicleId)
            .Include(execution => execution.ServicePricing)
                .ThenInclude(pricing => pricing.OfferedService)
                    .ThenInclude(offeredService => offeredService.ExternalServicer)
            .Include(execution => execution.ServicePricing)
                .ThenInclude(pricing => pricing.OfferedService)
                    .ThenInclude(offeredService => offeredService.Service)
            .Select(execution => execution.AsGetServiceExecutionDto());

            return serviceExecutions;
        }


        [HttpPost]
        public IActionResult CreateServiceExecution([FromBody] CreateServiceExecutionDto value)
        {
            var newExecution = value.AsServiceExecution();
            try
            {
                this.context.ServiceExecutions.Add(newExecution);
                this.context.SaveChanges();
                return StatusCode(201, newExecution.Id);

            }
            catch (System.Exception e)
            {
                return StatusCode(400, e.StackTrace);
            }
        }

        [HttpPost("{id}/end-execusion")]
        public IActionResult UpdateServiceExecution([FromBody] CreateServiceExecutionDto value)
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

        [HttpPut("{id}/end-execution")]
        public async Task<ActionResult> UpdateServiceExcecusionFinish(int id)
        {
            var existingServiceExecution = await this.context.ServiceExecutions.FindAsync(id);
            if (existingServiceExecution == null)
            {
                return NotFound();
            }

            existingServiceExecution.IsFinished = !existingServiceExecution.IsFinished;


            try
            {
                await this.context.SaveChangesAsync();
                return StatusCode(201, "Service Execution updated");
            }
            catch
            {
                return StatusCode(400, "something went wrong");
            }
        }
    }
}