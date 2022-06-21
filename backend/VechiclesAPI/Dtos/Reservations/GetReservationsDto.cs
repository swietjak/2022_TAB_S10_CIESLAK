namespace VehiclesAPI.Dtos
{
    public record GetUserReservationsDto
    {
        public int id { get; set; }
        public DateTime dateFrom { get; set; }
        public DateTime dateTo { get; set; }
        public VehicleSummary vehicleSummary { get; set; }
        public string status { get; set; }
        public string? description { get; set; }
    }

    public record VehicleSummary
    {
        public int id { get; set; }
        public string brand { get; set; }
        public string model { get; set; }
        public string vin { get; set; }
    }

    public enum ReservationStatus
    {
        Pending,
        Started,
        Finished
    }
}