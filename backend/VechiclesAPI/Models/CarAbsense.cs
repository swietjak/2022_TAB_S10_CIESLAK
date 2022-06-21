using System;
using System.Collections.Generic;

namespace VehiclesAPI.Models
{
    public partial class CarAbsense
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int VehicleId { get; set; }
        public string Description { get; set; }

        public virtual Vehicle Vehicle { get; set; }
    }
}
