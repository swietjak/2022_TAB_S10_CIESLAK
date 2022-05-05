namespace VehiclesAPI.Dtos
{
    public record GetVehiclesQuery
    {
        public string brand { get; set; }
    }
    public record GetVehiclesDto
    {
        public int id { get; set; }
        public string vin { get; set; }
        public string brand { get; set; }
        public string model { get; set; }
        public string[] equipments { get; set; }
    }
}