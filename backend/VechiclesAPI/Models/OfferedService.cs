using System;
using System.Collections.Generic;

namespace VehiclesAPI.Models
{
    public partial class OfferedService
    {
        public OfferedService()
        {
            ServiceExecutions = new HashSet<ServiceExecution>();
            ServicePricings = new HashSet<ServicePricing>();
        }

        public int Id { get; set; }
        public int ServiceId { get; set; }
        public int ExternalServicerId { get; set; }

        public virtual ExternalServicer ExternalServicer { get; set; }
        public virtual Service Service { get; set; }
        public virtual ICollection<ServiceExecution> ServiceExecutions { get; set; }
        public virtual ICollection<ServicePricing> ServicePricings { get; set; }
    }
}
