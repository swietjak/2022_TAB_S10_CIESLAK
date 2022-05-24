using VehiclesAPI.Dtos;
using VehiclesAPI.Models;

namespace VehiclesAPI.Extensions
{
    public static class ReservationsExtensions
    {
        public static GetReservationsDto AsGetReservationsDto(this Reservation item, Vehicle vehicle, Rental? rental, VehicleReturn? vehicleReturn)
        {
            return new GetReservationsDto
            {
                id = item.Id,
                dateFrom = item.DateFrom,
                dateTo = item.DateTo,
                description = item.Description,
                vehicleSummary = vehicle.AsVehicleSummary(),
                status = GetReservationStatus(rental, vehicleReturn).ToString().ToUpper()
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