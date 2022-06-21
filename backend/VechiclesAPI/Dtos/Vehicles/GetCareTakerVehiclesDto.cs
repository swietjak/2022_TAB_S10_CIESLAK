namespace VehiclesAPI.Dtos
{
    public record GetCareTakerVehiclesDto : GetVehiclesDto
    {
        public string status { get; set; }
        public int vehicleCareId { get; set; }
    }

    public enum VehicleStatus
    {
        Available,
        Rented,
        Absent,
        Reserved
    }
}