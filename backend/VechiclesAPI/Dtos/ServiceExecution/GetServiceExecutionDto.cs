using System;
using System.Collections.Generic;

namespace VehiclesAPI.Dtos
{
    public record ServiceVehicleCare
    {
        public int workerId { get; set; }
        public string workerName { get; set; }
        public string workerSurname { get; set; }

    }
    public record GetServiceExecutionDto
    {
        public int id { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public string description { get; set; }
        public bool isFinished { get; set; }
        public int servicePricingId { get; set; }
        public double price { get; set; }
        public string serviceName { get; set; }
        public string externalServicerName { get; set; }
    }
}