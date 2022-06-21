using VehiclesAPI.Dtos;
using VehiclesAPI.Models;

namespace VehiclesAPI.Extensions
{
    public static class RentalsExtensions
    {
        public static GetCareTakerRentalsDto AsGetCareTakerRentalsDto(this Reservation item)
        {
            return new GetCareTakerRentalsDto
            {
                id = item.Id,
                dateFrom = item.DateFrom,
                dateTo = item.DateTo,
                vehicleSummary = item.Vehicle.AsVehicleSummary(),
                rentalStartDate = item.Rental.Date,
                workerName = item.Worker.FirstName,
                workerSurname = item.Worker.Surname
            };
        }
    }
}