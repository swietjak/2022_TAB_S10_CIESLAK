using System;
using System.Collections.Generic;

namespace VehiclesAPI.Dtos
{
    public record GetServicePricingDto
    {
        public int id { get; set; }
        public int offeredServiceId {get; set;}
        public string serviceName { get; set; }
        public string providerName { get; set; }
        public double price { get; set; }
        public DateTime startDate { get; set; }
        public DateTime? endDate { get; set; }

    }
}
