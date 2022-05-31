import { CarRental, CarRepair, ViewList } from "@mui/icons-material";
import { paths } from "config";
import { useUserData } from "shared/hooks";

const userSidebarEntries = [
  { label: "Reservable cars", Icon: CarRental, path: paths.workerVehiclesList },
  { label: "Reservations", Icon: ViewList, path: paths.userReservationsTable },
];

const careTakerSidebarEntries = [
  {
    label: "Manage cars",
    Icon: CarRepair,
    path: paths.careTakerVehiclesList,
  },
  {
    label: "Manage Reservations",
    Icon: CarRental,
    path: paths.careTakerReservationsTable,
  },
];

export const useSidebarEntries = () => {
  const { hasAdminPermissions, hasCarePermissions } = useUserData();

  if (hasAdminPermissions || hasCarePermissions) return careTakerSidebarEntries;
  return userSidebarEntries;
};
