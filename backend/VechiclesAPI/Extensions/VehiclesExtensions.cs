using VehiclesAPI.Dtos;
using VehiclesAPI.Models;

namespace VehiclesAPI.Extensions
{
    public static class VehiclesExtensions
    {
        public static Vehicle AsVehicle(this CreateVehicleDto item)
        {
            return new Vehicle
            {
                Brand = item.brand,
                Model = item.model,
                EngineCapacity = item.engineCapacity,
                EnginePower = item.enginePower,
                Vin = item.vin,
            };
        }

        public static VehicleSummary AsVehicleSummary(this Vehicle item)
        {
            return new VehicleSummary
            {
                brand = item.Brand,
                id = item.Id,
                model = item.Model,
                vin = item.Vin
            };
        }
    }
}