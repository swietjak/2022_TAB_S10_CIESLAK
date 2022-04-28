using System;
using System.Collections.Generic;

namespace VechiclesAPI.Models
{
    public partial class ServicePricing
    {
        public int Id { get; set; }
        public int OfferedServiceId { get; set; }
        public double Price { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly? EndDate { get; set; }

        public virtual OfferedService? OfferedService { get; set; }
    }
}
