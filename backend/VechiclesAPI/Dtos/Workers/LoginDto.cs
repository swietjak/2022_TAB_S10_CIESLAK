namespace VehiclesAPI.Dtos
{
    public record LoginDto
    {
        public string login { get; set; }
        public string password { get; set; }
    }
}