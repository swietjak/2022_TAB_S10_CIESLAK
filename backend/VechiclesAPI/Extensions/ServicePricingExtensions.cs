using VehiclesAPI.Dtos;
using VehiclesAPI.Models;

namespace VehiclesAPI.Extensions
{
    public static class ServicePricingExtensions
    {
        public static ServicePricing AsServicePricing(this CreateServicePricingDto item)
        {
            return new ServicePricing
            {
                Price = item.price,
                StartDate = item.startDate,
                EndDate = item.endDate
            };
        }

        public static Entity AsEntity(this ServicePricing item)
        {
            return new Entity
            {
                id = item.Id,
                name = $"{item.OfferedService.Service.Name} - {item.Price}"
            };
        }
    }
}