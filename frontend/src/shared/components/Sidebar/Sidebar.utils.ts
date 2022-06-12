import {
  CarRental,
  CarRepair,
  ViewList,
  HomeRepairService,
} from "@mui/icons-material";
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

const adminSidebarEntries = [
  {
    label: "Manage cars",
    Icon: CarRepair,
    path: paths.adminVehiclesList,
  },
  {
    label: "Manage Servicers",
    Icon: HomeRepairService,
    path: paths.servicersTable,
  },
];

export const useSidebarEntries = () => {
  const { hasAdminPermissions, hasCarePermissions } = useUserData();

  if (hasAdminPermissions) return adminSidebarEntries;
  if (hasCarePermissions) return careTakerSidebarEntries;
  return userSidebarEntries;
};
