using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehiclesAPI.Dtos;
using VehiclesAPI.Models;
using VehiclesAPI.Extensions;

namespace VehiclesAPI.Controllers
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

        [HttpGet("statistics")]
        public IEnumerable<GetWorkerStatisticsDto> GetStatistics()
        {
            var workersStatistics = context.Workers
            .Include(worker => worker.Reservations)
                .ThenInclude(reservation => reservation.Rental)
                    .ThenInclude(rental => rental.VehicleReturn)
            .Select(worker => worker.AsGetWorkerStatisticsDto())
            .ToList();

            return workersStatistics;
        }

        [HttpGet("care-takers")]
        public IEnumerable<Entity> GetCareTakers()
        {
            var workers = context.Workers
            .Where(worker => worker.Hascarepermissions ?? false)
            .Select(worker => new Entity
            {
                name = $"{worker.FirstName} {worker.Surname}",
                id = worker.Id
            })
            .ToList();

            return workers;
        }
    }
}