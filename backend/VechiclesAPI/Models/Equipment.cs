using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VechiclesAPI.Models
{
    public record Equipment
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }

        public virtual ICollection<VechicleEquipment> VechicleEquipments { get; set; }
    }
}
