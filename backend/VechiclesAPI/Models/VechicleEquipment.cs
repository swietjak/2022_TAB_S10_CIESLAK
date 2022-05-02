using System;
using System.Collections.Generic;

namespace VechiclesAPI.Models
{
    public partial class VechicleEquipment
    {
        public int VechicleId { get; set; }
        public int EquipmentId { get; set; }
        public int? Amount { get; set; }

        public virtual Equipment Equipment { get; set; }
        public virtual Vechicle Vechicle { get; set; }
    }
}
