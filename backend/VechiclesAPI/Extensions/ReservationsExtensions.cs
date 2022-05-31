using VehiclesAPI.Dtos;
using VehiclesAPI.Models;

namespace VehiclesAPI.Extensions
{
    public static class ReservationsExtensions
    {
        public static GetUserReservationsDto AsGetReservationsDto(this Reservation item, Vehicle vehicle, Rental? rental, VehicleReturn? vehicleReturn)
        {
            return new GetUserReservationsDto
            {
                id = item.Id,
                dateFrom = item.DateFrom,
                dateTo = item.DateTo,
                description = item.Description,
                vehicleSummary = vehicle.AsVehicleSummary(),
                status = GetReservationStatus(rental, vehicleReturn).ToString().ToUpper()
            };
        }

        public static GetUserReservationsDto AsGetUserReservationsDto(this Reservation item)
        {
            return new GetUserReservationsDto
            {
                id = item.Id,
                dateFrom = item.DateFrom,
                dateTo = item.DateTo,
                description = item.Description,
                vehicleSummary = item.Vehicle.AsVehicleSummary(),
                status = GetReservationStatus(item.Rental, item.Rental?.VehicleReturn).ToString().ToUpper()
            };
        }

        public static GetCareTakerReservationsDto AsGetCareTakerReservationsDto(this Reservation item)
        {
            return new GetCareTakerReservationsDto
            {
                id = item.Id,
                dateFrom = item.DateFrom,
                dateTo = item.DateTo,
                vehicleSummary = item.Vehicle.AsVehicleSummary(),
                workerName = item.Worker.FirstName,
                workerSurname = item.Worker.Surname,
            };
        }

        public static GetCareTakerArchiveDto AsGetCareTakerArchiveDto(this Reservation item, VehicleReturn? vehicleReturn)
        {
            return new GetCareTakerArchiveDto
            {
                id = item.Id,
                dateFrom = item.DateFrom,
                dateTo = item.DateTo,
                vehicleSummary = item.Vehicle.AsVehicleSummary(),
                workerName = item.Worker.FirstName,
                workerSurname = item.Worker.Surname,
                rentalStartDate = item.Rental.Date,
                fuelConsumed = vehicleReturn?.FuelConsumption ?? 0,
                kmCovered = (vehicleReturn?.MeterIndication ?? 0) - item.Rental.MeterIndication,
                rentalEndDate = vehicleReturn?.Date ?? new DateTime(),
            };
        }

        private static ReservationStatus GetReservationStatus(Rental? rental, VehicleReturn? vehicleReturn)
        {
            if (vehicleReturn != null) return ReservationStatus.Finished;
            if (rental != null) return ReservationStatus.Started;
            return ReservationStatus.Pending;
        }
    }
}