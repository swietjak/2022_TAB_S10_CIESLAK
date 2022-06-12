namespace VehiclesAPI.Dtos
{
    public record GetWorkerStatisticsDto
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public int totalReservations { get; set; }
        public int currentReservations { get; set; }
        public int currentRentals { get; set; }
        public int totalDistanceCovered { get; set; }
        public double totalFuelUsed { get; set; }
    }
}