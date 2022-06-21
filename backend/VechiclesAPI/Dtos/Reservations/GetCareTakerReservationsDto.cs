namespace VehiclesAPI.Dtos
{
    public record GetCareTakerReservationsDto
    {
        public int id { get; set; }
        public DateTime dateFrom { get; set; }
        public DateTime dateTo { get; set; }
        public VehicleSummary vehicleSummary { get; set; }
        public string workerName { get; set; }
        public string workerSurname { get; set; }
    }
}