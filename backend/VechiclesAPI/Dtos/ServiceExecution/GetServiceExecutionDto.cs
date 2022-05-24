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
        public int vehicleId { get; set; }
        public string vechicleBrand { get; set; }
        public string vechicleModel { get; set; }
        public string vin { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public string description { get; set; }
        public bool isFinished { get; set; }
        public int vehicleCareId { get; set; }
        public ServiceVehicleCare vehicleCare { get; set; }
        public int offeredServiceId { get; set; }
        public string serviceName { get; set; }
        public string serviceExecutionerName { get; set; }
    }
}