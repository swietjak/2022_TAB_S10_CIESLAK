namespace VehiclesAPI.Dtos
{
    public record UpdateVehicleReturnDto
    {
        public string Description { get; set; }
        public int MeterIndication { get; set; }
        public double FuelConsumption { get; set; }
    }
}