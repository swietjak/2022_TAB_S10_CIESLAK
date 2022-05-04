using System;
using System.Collections.Generic;

namespace VechiclesAPI.Models
{
    public partial class Worker
    {
        public Worker()
        {
            Reservations = new HashSet<Reservation>();
            VechiclesCares = new HashSet<VechiclesCare>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Pesel { get; set; }
        public string Password { get; set; }
        public bool? Hascarepermissions { get; set; }
        public bool? Isadmin { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
        public virtual ICollection<VechiclesCare> VechiclesCares { get; set; }
    }
}
