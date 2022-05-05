using System;
using System.Collections.Generic;

namespace VehiclesAPI.Models
{
    public partial class VehicleEquipment
    {
        public int VehicleId { get; set; }
        public int EquipmentId { get; set; }
        public int? Amount { get; set; }

        public virtual Equipment Equipment { get; set; }
        public virtual Vehicle Vehicle { get; set; }
    }
}
