using System;
using System.Collections.Generic;

namespace VehiclesAPI.Models
{
    public partial class VehiclesCare
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public int WorkerId { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly? EndDate { get; set; }

        public virtual Vehicle Vehicle { get; set; }
        public virtual Worker Worker { get; set; }
    }
}
