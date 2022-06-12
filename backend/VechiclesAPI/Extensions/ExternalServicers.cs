using VehiclesAPI.Dtos;
using VehiclesAPI.Models;

namespace VehiclesAPI.Extensions
{
    public static class ExternalServicers
    {
        private static bool checkEndDate(DateTime? endDate)
        {
            if (endDate == null) return true;
            var tmp = endDate ?? DateTime.Now;

            return DateTime.Compare(tmp, DateTime.Now) > 0;
        }
        public static GetExternalServicersDto AsGetExternalServicersDto(this ExternalServicer item)
        {
            return new GetExternalServicersDto
            {
                id = item.Id,
                name = item.Name,
                servicesSummary = item.OfferedServices.Where(
                    service => service.ServicePricings.Where(
                    pricing => pricing.StartDate < DateTime.UtcNow && checkEndDate(pricing.EndDate)).FirstOrDefault() != null
                )
                .Select(service => new ServicesSummary
                {
                    id = service.Service.Id,
                    name = service.Service.Name,
                    price = service.ServicePricings.Where(s => s.OfferedServiceId == service.Id).First().Price
                }).ToArray()
            };
        }
    }
}