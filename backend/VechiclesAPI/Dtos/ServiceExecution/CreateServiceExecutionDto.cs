using System;
using System.Collections.Generic;

namespace VehiclesAPI.Dtos
{

    public record CreateServiceExecutionDto
    {
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public string description { get; set; }
        public int vehicleCareId { get; set; }
        public int servicePricingId { get; set; }
    }
}