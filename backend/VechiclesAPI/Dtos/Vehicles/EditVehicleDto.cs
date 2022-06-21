namespace VehiclesAPI.Dtos
{
    public record EditVehicleDto
    {
        public string vin { get; set; }
        public string brand { get; set; }
        public string model { get; set; }
        public int enginePower { get; set; }
        public double engineCapacity { get; set; }
        public NewEquipmentEntry[] equipments { get; set; }
    }
}