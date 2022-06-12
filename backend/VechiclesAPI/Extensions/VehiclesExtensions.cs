using Microsoft.EntityFrameworkCore;
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

        public static GetVehiclesDto AsGetVehicleDto(this Vehicle item)
        {
            return new GetVehiclesDto
            {
                brand = item.Brand,
                equipments = item.VehicleEquipments.Select(ve => ve.Equipment.Name).ToArray(),
                id = item.Id,
                model = item.Model,
                vin = item.Vin
            };
        }

        public static GetVehicleDetailsDto AsGetVehicleDetailsDto(this Vehicle item)
        {
            return new GetVehicleDetailsDto
            {
                brand = item.Brand,
                equipments = item.VehicleEquipments.Select(ve => new EquipmentDetails { id = ve.Equipment.Id, name = ve.Equipment.Name, amount = ve.Amount ?? 0 }).ToArray(),
                id = item.Id,
                model = item.Model,
                vin = item.Vin
            };
        }

        public static GetCareTakerVehiclesDto AsGetCareTakerVehicleDto(this Vehicle item, VehiclesCare vehicleCare)
        {
            return new GetCareTakerVehiclesDto
            {
                brand = item.Brand,
                equipments = item.VehicleEquipments.Select(ve => ve.Equipment.Name).ToArray(),
                id = item.Id,
                model = item.Model,
                vin = item.Vin,
                status = GetVehicleStatus(item, vehicleCare).ToString().ToUpper(),
                vehicleCareId = vehicleCare.Id
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

        public static VehicleStatus GetVehicleStatus(Vehicle vehicle, VehiclesCare care)
        {
            var currentReservations = vehicle.Reservations
            .Where(reservation => IsReservationPending(reservation))
            .ToList();

            var currentRentals = vehicle.Reservations
            .Where(reservation => reservation.Rental != null && reservation.Rental.VehicleReturn == null)
            .ToList();

            var currentExecutions = care.ServiceExecutions
            .Where(execution => IsExecutionExecuted(execution))
            .ToList();

            if (currentReservations.Count > 0) return VehicleStatus.Reserved;
            if (currentRentals.Count > 0) return VehicleStatus.Rented;
            if (currentExecutions.Count > 0) return VehicleStatus.Absent;

            return VehicleStatus.Available;
        }

        private static bool IsExecutionExecuted(ServiceExecution execution)
        {
            if (execution.IsFinished) return false;
            return execution.StartDate.CompareTo(DateTime.Now) < 0 && execution.EndDate.CompareTo(DateTime.Now) > 0;
        }

        private static bool IsReservationPending(Reservation reservation)
        {
            if (reservation.Rental != null)
                return false;

            return reservation.DateFrom.CompareTo(DateTime.Now) < 0 && reservation.DateTo.CompareTo(DateTime.Now) > 0;
        }

        public static GetVehicleStatisticsDto AsGetVehicleStatisticsDto(this Vehicle vehicle)
        {
            var lastRental = vehicle.Reservations.Select(reservation => reservation.Rental.VehicleReturn).OrderBy(vehicleReturn => vehicleReturn.Date.Ticks).FirstOrDefault();
            return new GetVehicleStatisticsDto
            {
                totalExecutions = vehicle.VehiclesCares.SelectMany(care => care.ServiceExecutions).Count(),
                totalKilometers = lastRental == null ? 0 : lastRental.MeterIndication,
                totalFuel = vehicle.Reservations.Select(reservation => reservation.Rental.VehicleReturn.FuelConsumption).Sum(),
                totalPrice = vehicle.VehiclesCares.SelectMany(care => care.ServiceExecutions).Sum(execution => execution.ServicePricing.Price),
                totalReservations = vehicle.Reservations.Count()
            };
        }
    }
}