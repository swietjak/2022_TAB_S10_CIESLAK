public record CreateExternalServicerDto
{
    public string name { get; set; }
    public ServicePricingSummary[] servicePricings { get; set; }

}

public record ServicePricingSummary
{
    public int serviceId { get; set; }
    public int price { get; set; }
}