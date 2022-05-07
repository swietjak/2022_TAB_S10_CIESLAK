using System.ComponentModel.DataAnnotations;

namespace VehiclesAPI.Dtos
{
    public record RegisterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Pesel { get; set; }
        public bool? Hascarepermissions { get; set; }
        public bool? Isadmin { get; set; }
    }
}