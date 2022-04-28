using System;
using System.Collections.Generic;

namespace VechiclesAPI.Models
{
    public partial class CarAbsense
    {
        public int Id { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int VechicleId { get; set; }
        public string? Description { get; set; }

        public virtual Vechicle? Vechicle { get; set; }
    }
}
