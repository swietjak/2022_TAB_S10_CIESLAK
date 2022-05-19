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
                Price = item.Price,
                StartDate = item.StartDate,
                EndDate = item.EndDate
            };
        }
    }
}