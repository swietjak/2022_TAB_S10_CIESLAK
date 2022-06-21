namespace VehiclesAPI.Dtos
{
    public record GetExternalServicersDto
    {
        public int id { get; set; }
        public string name { get; set; }
        public ServicesSummary[] servicesSummary { get; set; }
    }

    public record ServicesSummary
    {
        public int id { get; set; }
        public string name { get; set; }
        public double price { get; set; }
    }
}