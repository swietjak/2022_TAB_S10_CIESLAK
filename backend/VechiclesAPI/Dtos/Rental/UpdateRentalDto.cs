namespace VehiclesAPI.Dtos
{
    public record UpdateRentalDto
    {
        public string Description { get; set; }
        public int MeterIndication { get; set; }
        public int? VehicleReturnId { get; set; }
    }
}