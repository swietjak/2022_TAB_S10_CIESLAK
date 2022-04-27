using System;
using System.Collections.Generic;

namespace VechiclesAPI.Models
{
    public partial class Rental
    {
        public Rental()
        {
            Reservations = new HashSet<Reservation>();
        }

        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public string Description { get; set; }
        public int ReservationId { get; set; }
        public int MeterIndication { get; set; }
        public int? VechicleReturnId { get; set; }

        public virtual VechicleReturn VechicleReturn { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
