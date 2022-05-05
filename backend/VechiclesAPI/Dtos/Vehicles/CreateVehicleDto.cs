namespace VehiclesAPI.Dtos
{
    public record NewEquipmentEntry
    {
        public int id { get; set; }
        public int amount { get; set; }
    }
    public record CreateVehicleDto
    {
        public string vin { get; set; }
        public string brand { get; set; }
        public string model { get; set; }
        public int enginePower { get; set; }
        public int engineCapacity { get; set; }
        public NewEquipmentEntry[] equipments { get; set; }
    }
}