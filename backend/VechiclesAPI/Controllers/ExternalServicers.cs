using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using VehiclesAPI.Dtos;
using VehiclesAPI.Models;
using VehiclesAPI.Extensions;

namespace VehiclesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExternalServicersController : ControllerBase
    {
        private readonly WorldContext context;
        private async Task<bool> IsAsyncSuccessful()
        {
            try
            {
                await this.context.SaveChangesAsync();
                return true;
            }
            catch (System.Exception)
            {
                return false;
            }
        }
        public ExternalServicersController(WorldContext context)
        {
            this.context = context;
        }


        [HttpGet(Name = "GetExternalServicers")]
        public IEnumerable<GetExternalServicersDto> GetExternalServicers()
        {
            var externalServicers = this.context.ExternalServicers
            .Include(servicer => servicer.OfferedServices).ThenInclude(service => service.Service)
            .Include(servicer => servicer.OfferedServices).ThenInclude(service => service.ServicePricings)
            .Select(servicer => servicer.AsGetExternalServicersDto());

            return externalServicers;
        }

        [HttpGet("{id}")]
        public GetExternalServicersDto GetExternalServicers(int id)
        {
            var externalServicer = this.context.ExternalServicers
            .Where(servicer => servicer.Id == id)
            .Include(servicer => servicer.OfferedServices).ThenInclude(service => service.Service)
            .Include(servicer => servicer.OfferedServices).ThenInclude(service => service.ServicePricings)
            .Select(servicer => servicer.AsGetExternalServicersDto())
            .First();

            return externalServicer;
        }

        [HttpPost]
        public async Task<IActionResult> CreateExternalServicer([FromBody] CreateExternalServicerDto value)
        {
            var newServicer = new ExternalServicer
            {
                Name = value.name
            };
            await this.context.ExternalServicers.AddAsync(newServicer);

            if (!(await IsAsyncSuccessful())) return StatusCode(400, "Failed");

            foreach (var pricing in value.servicePricings)
            {
                if (this.context.Services.FirstOrDefault(service => service.Id == pricing.serviceId) == null)
                    return StatusCode(400, "No such service");
            }

            var newOfferedServices = value.servicePricings.Select(pricing => new OfferedService
            {
                ServiceId = pricing.serviceId,
                ExternalServicerId = newServicer.Id
            }).ToList();

            await this.context.OfferedServices.AddRangeAsync(newOfferedServices);

            if (!(await IsAsyncSuccessful())) return StatusCode(400, "Failed");

            var servicesPricings = newOfferedServices.Select((service, i) => new ServicePricing
            {
                OfferedServiceId = service.Id,
                Price = value.servicePricings[i].price,
                StartDate = DateTime.UtcNow
            }).ToList();

            await this.context.ServicePricings.AddRangeAsync(servicesPricings);

            if (!(await IsAsyncSuccessful())) return StatusCode(400, "Failed");

            return StatusCode(201, "OK");
        }

        private List<ServicePricing> GetServicerPricings(int servicerId)
        {
            return this.context.ServicePricings
            .Include(pricing => pricing.OfferedService).ThenInclude(service => service.ExternalServicer)
            .Include(pricing => pricing.OfferedService).ThenInclude(service => service.Service)
            .Where(pricing => pricing.EndDate == null && pricing.OfferedService.ExternalServicer.Id == servicerId)
            .ToList();
        }

        private List<ServicePricingSummary> GetNewPricings(List<ServicePricing> servicerPricings, ServicePricingSummary[] valuePricings)
        {
            return valuePricings.Where(pricing => !servicerPricings.Any(sp => sp.OfferedService.Service.Id == pricing.serviceId)).ToList();
        }

        private void UpdatePricings(List<ServicePricing> servicerPricings, ServicePricingSummary[] valuePricings)
        {
            var pricings = servicerPricings.Where(pricing => valuePricings.Any(vp => pricing.OfferedService.Service.Id == vp.serviceId)).ToList();
            foreach (var pricing in pricings)
            {
                pricing.Price = valuePricings.First(p => p.serviceId == pricing.OfferedService.ServiceId).price;
                this.context.Update(pricing);
            }
        }

        private void EndDeletablePricings(List<ServicePricing> servicerPricings, ServicePricingSummary[] valuePricings)
        {
            var pricings = servicerPricings.Where(pricing => !valuePricings.Any(vp => pricing.OfferedService.Service.Id == vp.serviceId)).ToList();
            foreach (var pricing in pricings)
            {
                pricing.EndDate = DateTime.UtcNow;
                this.context.Update(pricing);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExternalServicer(int id, [FromBody] CreateExternalServicerDto value)
        {
            var servicer = await this.context.ExternalServicers.Where(s => s.Id == id).FirstOrDefaultAsync();
            if (servicer == null) return StatusCode(400, "No such servicer");

            servicer.Name = value.name;

            foreach (var pricing in value.servicePricings)
            {
                if (this.context.Services.FirstOrDefault(service => service.Id == pricing.serviceId) == null)
                    return StatusCode(400, "No such service");
            }

            var servicerPricings = GetServicerPricings(servicer.Id);

            EndDeletablePricings(servicerPricings, value.servicePricings);
            UpdatePricings(servicerPricings, value.servicePricings);
            var xd = await IsAsyncSuccessful();
            if (!xd) return StatusCode(400, "Failed");

            var newPricings = GetNewPricings(servicerPricings, value.servicePricings);

            var newOfferedServices = newPricings.Select(pricing => new OfferedService
            {
                ServiceId = pricing.serviceId,
                ExternalServicerId = servicer.Id,
            }).ToList();

            await this.context.OfferedServices.AddRangeAsync(newOfferedServices);
            if (!(await IsAsyncSuccessful())) return StatusCode(400, "Failed");

            var servicesPricings = newOfferedServices.Select((service, i) => new ServicePricing
            {
                OfferedServiceId = service.Id,
                Price = value.servicePricings[i].price,
                StartDate = DateTime.UtcNow
            }).ToList();

            await this.context.ServicePricings.AddRangeAsync(servicesPricings);
            xd = await IsAsyncSuccessful();
            if (!xd) return StatusCode(400, "Failed");


            return StatusCode(201, "OK");
        }
    }
}