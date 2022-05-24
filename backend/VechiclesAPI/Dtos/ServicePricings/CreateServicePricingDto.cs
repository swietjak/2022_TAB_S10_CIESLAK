

namespace VehiclesAPI.Dtos
{
    public record OfferedServiceDto {
        public string serviceName {get; set;}
        public string providerName {get; set;}
    }
    public record CreateServicePricingDto
    {
        public int id { get; set; }
        public OfferedServiceDto offeredService { get; set; }
        public double price { get; set; }
        public DateTime startDate { get; set; }
        public DateTime? endDate { get; set; }

        
    }
}
