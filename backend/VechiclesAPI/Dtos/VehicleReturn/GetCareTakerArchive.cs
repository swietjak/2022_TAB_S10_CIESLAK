namespace VehiclesAPI.Dtos
{
    public record GetCareTakerArchiveDto
    {
        public int id { get; set; }
        public DateTime rentalStartDate { get; set; }
        public DateTime rentalEndDate { get; set; }
        public DateTime dateFrom { get; set; }
        public DateTime dateTo { get; set; }
        public VehicleSummary vehicleSummary { get; set; }
        public double fuelConsumed { get; set; }
        public int kmCovered { get; set; }
        public string workerName { get; set; }
        public string workerSurname { get; set; }
    }
}