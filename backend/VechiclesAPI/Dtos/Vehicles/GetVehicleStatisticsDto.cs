public record GetVehicleStatisticsDto
{
    public int totalReservations { get; set; }
    public int totalRentals { get; set; }
    public int totalExecutions { get; set; }
    public double totalPrice { get; set; }
    public double totalFuel { get; set; }
    public int totalKilometers { get; set; }
}