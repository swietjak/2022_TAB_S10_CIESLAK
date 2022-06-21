import { format, parseISO } from "date-fns";
import { Column, ReservationArchive } from "shared/types";

const DEFAULT_DATE_FORMAT = "dd/MM/yyyy";

export const useColumns = (): Column<ReservationArchive>[] => [
  {
    label: "Worker name",
    renderData: (data: ReservationArchive) =>
      `${data.workerName} ${data.workerSurname}`,
  },
  {
    label: "Vehicle",
    renderData: (data: ReservationArchive) =>
      `${data.vehicleSummary.brand} ${data.vehicleSummary.model}`,
  },
  {
    label: "Reservation start",
    renderData: (data: ReservationArchive) =>
      format(parseISO(data.dateFrom), DEFAULT_DATE_FORMAT),
  },
  {
    label: "Reservation end",
    renderData: (data: ReservationArchive) =>
      format(parseISO(data.dateTo), DEFAULT_DATE_FORMAT),
  },
  {
    label: "Distance covered",
    renderData: (data: ReservationArchive) => data.kmCovered.toString(),
  },
  {
    label: "Fuel consumed",
    renderData: (data: ReservationArchive) => data.fuelConsumed.toString(),
  },
];
