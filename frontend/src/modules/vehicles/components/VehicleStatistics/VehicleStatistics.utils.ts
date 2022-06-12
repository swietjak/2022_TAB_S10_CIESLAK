import { useMemo } from "react";
import { Column, VehicleStatistics } from "shared/types";

export const useColumns = (): Column<VehicleStatistics>[] => {
  return useMemo(
    () => [
      {
        label: "total reservations",
        renderData: (data: VehicleStatistics) =>
          data.totalReservations.toString(),
      },
      {
        label: "total rentals",
        renderData: (data: VehicleStatistics) => data.totalRentals.toString(),
      },
      {
        label: "total executions",
        renderData: (data: VehicleStatistics) =>
          data.totalExecutions.toString(),
      },
      {
        label: "total cost",
        renderData: (data: VehicleStatistics) => data.totalPrice.toString(),
      },
      {
        label: "total fuel",
        renderData: (data: VehicleStatistics) => data.totalFuel.toString(),
      },
      {
        label: "total kilometers",
        renderData: (data: VehicleStatistics) =>
          data.totalKilometers.toString(),
      },
    ],
    []
  );
};
