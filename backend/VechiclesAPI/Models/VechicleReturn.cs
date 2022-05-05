using System;
using System.Collections.Generic;

namespace VehiclesAPI.Models
{
    public partial class VehicleReturn
    {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public string Description { get; set; }
        public int MeterIndication { get; set; }
        public double FuelConsumption { get; set; }
        public int RentalId { get; set; }

        public virtual Rental Rental { get; set; }
    }
}
