namespace VehiclesAPI.Dtos
{
    public record UserPermisions
    {
        public bool hasCarePermissions { get; set; }
        public bool isAdmin { get; set; }
    }
    public record LoginResponseDto
    {
        public int userId { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public UserPermisions userPermisions { get; set; }
    }
}