using System;
using System.Collections.Generic;

namespace VechiclesAPI.Models
{
    public partial class VechiclesCare
    {
        public int Id { get; set; }
        public int VechicleId { get; set; }
        public int WorkerId { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly? EndDate { get; set; }

        public virtual Vechicle Vechicle { get; set; }
        public virtual Worker Worker { get; set; }
    }
}
