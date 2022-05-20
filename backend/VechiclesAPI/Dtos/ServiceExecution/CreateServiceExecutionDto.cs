using System;
using System.Collections.Generic;

namespace VehiclesAPI.Dtos
{

    public record CreateServiceExecutionDto
    {
        public int vehicleId { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public string description { get; set; }
        public int vehicleCareId { get; set; }
        public int offeredServiceId { get; set; }
    }
}