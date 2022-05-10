namespace VehiclesAPI.Dtos
{
    public record CreateReservationDto
    {
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public int WorkerId { get; set; }
        public int VehicleId { get; set; }
        public string? Description { get; set; }
    }
}