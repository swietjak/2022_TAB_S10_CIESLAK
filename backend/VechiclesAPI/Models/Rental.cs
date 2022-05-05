using System;
using System.Collections.Generic;

namespace VehiclesAPI.Models
{
    public partial class Rental
    {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public string Description { get; set; }
        public int ReservationId { get; set; }
        public int MeterIndication { get; set; }
        public int? VehicleReturnId { get; set; }

        public virtual Reservation Reservation { get; set; }
        public virtual VehicleReturn VehicleReturn { get; set; }
    }
}
