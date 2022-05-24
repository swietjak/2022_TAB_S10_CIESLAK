import { TabEntry } from "shared/types";
import {
  CarTakerRentalsTable,
  CarTakerReservationTable,
} from "../../components";

export const useTabEntries = (): TabEntry[] => {
  return [
    {
      label: "RESERVATIONS",
      panel: <CarTakerReservationTable />,
    },
    {
      label: "RENTALS",
      panel: <CarTakerRentalsTable />,
    },
  ];
};
