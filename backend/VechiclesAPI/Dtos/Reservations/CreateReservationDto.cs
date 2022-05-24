namespace VehiclesAPI.Dtos
{
    public record CreateReservationDto
    {
        public DateTime dateFrom { get; set; }
        public DateTime dateTo { get; set; }
        public int workerId { get; set; }
        public int vehicleId { get; set; }
        public string? description { get; set; }
    }
}