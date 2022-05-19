

namespace VehiclesAPI.Dtos
{
    public record OfferedServiceDto {
        public string ServiceName {get; set;}
        public string ProviderName {get; set;}
    }
    public record CreateServicePricingDto
    {
        public int Id { get; set; }
        public OfferedServiceDto OfferedService { get; set; }
        public double Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        
    }
}
