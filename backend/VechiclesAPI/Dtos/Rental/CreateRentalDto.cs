namespace VehiclesAPI.Dtos
{
    public record CreateRentalDto
    {
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public int ReservationId { get; set; }
        public int MeterIndication { get; set; }
        public int? VehicleReturnId { get; set; }
    }
}
