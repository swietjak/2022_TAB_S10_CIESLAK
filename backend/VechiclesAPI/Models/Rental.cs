using System;
using System.Collections.Generic;

namespace VechiclesAPI.Models
{
    public partial class Rental
    {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public string Description { get; set; }
        public int ReservationId { get; set; }
        public int MeterIndication { get; set; }
        public int? VechicleReturnId { get; set; }

        public virtual Reservation Reservation { get; set; }
        public virtual VechicleReturn VechicleReturn { get; set; }
    }
}
