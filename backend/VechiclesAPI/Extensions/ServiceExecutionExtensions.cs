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
                StartDate = item.startDate,
                EndDate = item.endDate,
                Description = item.description,
                VehicleCareId = item.vehicleCareId,
                ServicePricingId = item.servicePricingId,
                IsFinished = false
            };
        }

        public static GetServiceExecutionDto AsGetServiceExecutionDto(this ServiceExecution item)
        {
            return new GetServiceExecutionDto
            {
                description = item.Description,
                endDate = item.EndDate,
                externalServicerName = item.ServicePricing.OfferedService.ExternalServicer.Name,
                id = item.Id,
                price = item.ServicePricing.Price,
                isFinished = item.IsFinished,
                serviceName = item.ServicePricing.OfferedService.Service.Name,
                servicePricingId = item.ServicePricing.Id,
                startDate = item.StartDate,

            };
        }
    }
}