using System;
using System.Collections.Generic;

namespace VehiclesAPI.Models
{
    public partial class Equipment
    {
        public Equipment()
        {
            VehicleEquipments = new HashSet<VehicleEquipment>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<VehicleEquipment> VehicleEquipments { get; set; }
    }
}
