using System.ComponentModel.DataAnnotations;

namespace VehiclesAPI.Dtos
{
    public record RegisterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        public string Pesel { get; set; }
        public bool? Hascarepermissions { get; set; }
        public bool? Isadmin { get; set; }
    }
}