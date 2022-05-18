using System;
using System.Collections.Generic;

namespace VehiclesAPI.Models
{
    public partial class Worker
    {
        public Worker()
        {
            Reservations = new HashSet<Reservation>();
            VehiclesCares = new HashSet<VehiclesCare>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Pesel { get; set; }
        public string Password { get; set; }
        public bool? Hascarepermissions { get; set; }
        public bool? Isadmin { get; set; }
        public string Email { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
        public virtual ICollection<VehiclesCare> VehiclesCares { get; set; }
    }
}
