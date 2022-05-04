using System;
using System.Collections.Generic;

namespace VechiclesAPI.Models
{
    public partial class ServiceExecution
    {
        public int Id { get; set; }
        public int VechicleId { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public string Description { get; set; }
        public bool IsFinished { get; set; }
        public int VechicleCareId { get; set; }
        public int OfferedServiceId { get; set; }

        public virtual OfferedService OfferedService { get; set; }
        public virtual Vechicle Vechicle { get; set; }
    }
}
