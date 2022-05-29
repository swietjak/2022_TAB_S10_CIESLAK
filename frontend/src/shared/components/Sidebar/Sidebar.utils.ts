import { CarRental, CarRepair, ViewList } from "@mui/icons-material";
import { paths } from "config";
import { useUserData } from "shared/hooks";

const userSidebarEntries = [
  { label: "Reservable cars", Icon: CarRental, path: paths.workerVehiclesList },
  { label: "Reservations", Icon: ViewList, path: paths.userReservationsTable },
];

const careTakerSidebarEntries = [
  ...userSidebarEntries,
  { label: "Manage cars", Icon: CarRepair, path: paths.userReservationsTable },
];

export const useSidebarEntries = () => {
  const { hasAdminPermissions, hasCarePermissions } = useUserData();

  if (hasAdminPermissions || hasAdminPermissions)
    return careTakerSidebarEntries;
  return userSidebarEntries;
};
