using VehiclesAPI.Dtos;
using VehiclesAPI.Models;

namespace VehiclesAPI.Extensions
{
    public static class WorkersExtensions
    {
        public static GetWorkerStatisticsDto AsGetWorkerStatisticsDto(this Worker item)
        {
            var reservationsWithRentals = item.Reservations
            .Where(reservation => reservation.Rental != null)
            .ToList();

            var reservationsWithVehicleReturns = reservationsWithRentals
            .Where(reservation => reservation.Rental.VehicleReturn != null)
            .ToList();

            return new GetWorkerStatisticsDto
            {
                currentRentals = reservationsWithRentals
                .Where(reservation => reservation.Rental.VehicleReturn == null)
                .Count(),
                currentReservations = item.Reservations
                .Where(reservation => IsReservationInProgress(reservation))
                .Count(),
                firstName = item.FirstName,
                lastName = item.Surname,
                totalDistanceCovered = reservationsWithVehicleReturns
                .Select(reservation => reservation.Rental.VehicleReturn.MeterIndication - reservation.Rental.MeterIndication)
                .Sum(),
                totalFuelUsed = reservationsWithVehicleReturns
                .Sum(reservation => reservation.Rental.VehicleReturn.FuelConsumption),
                totalReservations = item.Reservations.Count()
            };
        }

        public static bool IsReservationInProgress(Reservation reservation)
        {
            if (reservation.Rental != null && reservation.Rental.VehicleReturn != null) return false;

            return reservation.DateFrom.CompareTo(DateTime.Now) < 0 && reservation.DateTo.CompareTo(DateTime.Now) > 0;
        }
    }
}