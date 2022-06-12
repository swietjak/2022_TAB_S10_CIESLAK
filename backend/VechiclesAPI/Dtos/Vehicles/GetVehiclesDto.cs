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

    public record GetVehicleDetailsDto
    {
        public int id { get; set; }
        public string vin { get; set; }
        public string brand { get; set; }
        public string model { get; set; }
        public double engineCapacity { get; set; }
        public int enginePower { get; set; }
        public EquipmentDetails[] equipments { get; set; }
    }

    public record EquipmentDetails : Entity
    {
        public int amount { get; set; }
    }
}