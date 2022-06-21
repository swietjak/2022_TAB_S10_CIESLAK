using System;
using System.Collections.Generic;

namespace VehiclesAPI.Models
{
    public partial class VehiclesCare
    {
        public VehiclesCare()
        {
            ServiceExecutions = new HashSet<ServiceExecution>();

        }
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public int WorkerId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public virtual Vehicle Vehicle { get; set; }
        public virtual Worker Worker { get; set; }
        public virtual ICollection<ServiceExecution> ServiceExecutions { get; set; }
    }
}
