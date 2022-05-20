using VehiclesAPI.Dtos;
using VehiclesAPI.Models;

namespace VehiclesAPI.Extensions
{
    public static class ServiceExecutionExtensions
    {
        public static ServiceExecution AsServiceExecution(this CreateServiceExecutionDto item)
        {
            return new ServiceExecution
            {
                VehicleId = item.vehicleId,
                StartDate = item.startDate,
                EndDate = item.endDate,
                Description = item.description,
                VehicleCareId = item.vehicleCareId,
                OfferedServiceId = item.offeredServiceId,
                IsFinished = false
            };
        }
    }
}