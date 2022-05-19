using Microsoft.AspNetCore.Mvc;
using VehiclesAPI.Models;
using VehiclesAPI.Dtos;
using VehiclesAPI.Extensions;

namespace VehiclesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServicePricingController : ControllerBase
    {
        private readonly WorldContext context;

        public ServicePricingController(WorldContext context)
        {
            this.context = context;
        }


        [HttpGet(Name = "GetServicePricing")]
        public IEnumerable<GetServicePricingDto> GetServicePricings(string? ProviderName, string? ServiceName, DateTime? StartPeriod, DateTime? EndPeriod)
        {
            return (
                from s in context.ServicePricings
                join o in context.OfferedServices
                on s.OfferedServiceId equals o.Id
                select new GetServicePricingDto
                {
                    id = s.Id,
                    offeredServiceId = s.OfferedServiceId,
                    serviceName = (
                        from e in context.Services
                        where e.Id == o.ServiceId
                        select e.Name
                        ).First(),
                    providerName = (
                        from e in context.ExternalServicers
                        where e.Id == o.ExternalServicerId
                        select e.Name
                        ).First(),
                    price = s.Price,
                    startDate = s.StartDate,
                    endDate = s.EndDate
                }
                ).OrderBy(s => s.providerName)
                .Where(s => s.providerName.Contains(string.IsNullOrEmpty(ProviderName) ? "" : ProviderName))
                .Where(s => s.providerName.Contains(string.IsNullOrEmpty(ServiceName) ? "" : ServiceName))
                .Where(s => (StartPeriod != null ? StartPeriod : DateTime.UtcNow ) >= s.startDate)
                .Where(s => (s.endDate != null ? ((EndPeriod != null ? EndPeriod : DateTime.UtcNow ) <= s.endDate) : true)) 
                .ToList();
        }

       

        [HttpGet("{id}")]
        public GetServicePricingDto GetServicePricingById(int id)
        {
            return (
                from s in context.ServicePricings
                join o in context.OfferedServices
                on s.OfferedServiceId equals o.Id
                where s.Id == id
                select new GetServicePricingDto
                {
                    id = s.Id,
                    offeredServiceId = s.OfferedServiceId,
                    serviceName = (
                        from e in context.Services
                        where e.Id == o.ServiceId
                        select e.Name
                        ).First(),
                    providerName = (
                        from e in context.ExternalServicers
                        where e.Id == o.ExternalServicerId
                        select e.Name
                        ).First(),
                    price = s.Price,
                    startDate = s.StartDate,
                    endDate = s.EndDate
                }).First();
        }

        [HttpPost]
        public IActionResult CreateServicePricing([FromBody] CreateServicePricingDto value)
        {
            try
            {
                var newServicePricing = value.AsServicePricing();
                int OfferServiceNumber = isSameService(value.OfferedService.ServiceName, value.OfferedService.ProviderName);
                int canBeAdded = 1;
                if(OfferServiceNumber != 0) {
                    newServicePricing.OfferedServiceId = OfferServiceNumber;
                    canBeAdded = updateServicePricing(newServicePricing.StartDate, newServicePricing.Price, newServicePricing.OfferedServiceId);
                }
                else {
                    Service service = new Service {Name = value.OfferedService.ServiceName};
                    this.context.Services.Add(service);
                    ExternalServicer externalServicer = new ExternalServicer {Name = value.OfferedService.ProviderName};
                    this.context.ExternalServicers.Add(externalServicer);
                    OfferedService offeredService = new OfferedService{
                        ExternalServicerId = externalServicer.Id,
                        ServiceId = service.Id
                    };
                    this.context.OfferedServices.Add(offeredService);
                    newServicePricing.OfferedServiceId = OfferServiceNumber;
                }
                if(canBeAdded > 0){
                    this.context.ServicePricings.Add(newServicePricing);
                    this.context.SaveChanges();
                    return StatusCode(201, newServicePricing.Id);
                }
                
            }
            catch (System.Exception e)
            {
                return StatusCode(400, e.StackTrace);
            }

            // this.context.Vehicles.Add(newServicePricing);

            // var vehicleEquipmentList = value.equipments.Select(e => new VehicleEquipment { Amount = e.amount, EquipmentId = e.id, VehicleId = newVehicle.Id });

            // try
            // {
            //     this.context.VehicleEquipments.AddRange(vehicleEquipmentList);
            //     this.context.SaveChanges();
            //     return StatusCode(201, newVehicle.Id);
            // }
            // catch (System.Exception e)
            // {
            //     return StatusCode(400, e.StackTrace);
            // }
            return StatusCode(400, "OfferServiceNumber");
        }

        private  int updateServicePricing(DateTime endTime, double  price, int offeredServiceId){
            var id = 
                (from s in context.ServicePricings
                where s.OfferedServiceId == offeredServiceId
                select s.Id
                ).First();
            var existingServicePrising =  this.context.ServicePricings.Find(id);
            if (existingServicePrising == null)
            {
                return -1;
            }
            if((existingServicePrising.EndDate == null || existingServicePrising.EndDate > endTime )&& existingServicePrising.Price != price){
                existingServicePrising.EndDate = endTime;
                this.context.SaveChanges();
                return 1;
            }else{
                return 0;
            }
            

            

        }

        private int isSameService(string service, string provider){
            return (
                from o in context.OfferedServices
                join s in context.Services
                on o.ServiceId equals s.Id
                join e in context.ExternalServicers
                on o.ExternalServicerId equals e.Id
                where e.Name == provider && s.Name == service
                select o.Id
            ).FirstOrDefault();
                
        }
    }
}