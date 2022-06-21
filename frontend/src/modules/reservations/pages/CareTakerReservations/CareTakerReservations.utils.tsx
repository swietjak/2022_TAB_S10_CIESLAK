import { TabEntry } from "shared/types";
import {
  ArchivesTable,
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
    {
      label: "ARCHIVE",
      panel: <ArchivesTable />,
    },
  ];
};
