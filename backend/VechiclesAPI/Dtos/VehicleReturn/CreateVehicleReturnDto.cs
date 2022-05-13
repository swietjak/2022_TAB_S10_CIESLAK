namespace VehiclesAPI.Dtos
{
    public record CreateVehicleReturnDto
    {
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public int MeterIndication { get; set; }
        public double FuelConsumption { get; set; }
        public int RentalId { get; set; }
    }
}
