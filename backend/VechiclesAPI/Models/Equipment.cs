using System;
using System.Collections.Generic;

namespace VechiclesAPI.Models
{
    public partial class Equipment
    {
        public Equipment()
        {
            VechicleEquipments = new HashSet<VechicleEquipment>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<VechicleEquipment> VechicleEquipments { get; set; }
    }
}
