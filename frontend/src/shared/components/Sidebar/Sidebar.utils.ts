import {
  CarRental,
  CarRepair,
  ViewList,
  HomeRepairService,
  BarChart,
  DirectionsCarFilled,
} from "@mui/icons-material";
import { paths } from "config";
import { useUserData } from "shared/hooks";

const userSidebarEntries = [
  {
    label: "Reservable cars",
    Icon: DirectionsCarFilled,
    path: paths.workerVehiclesList,
  },
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
  ...userSidebarEntries,
  {
    label: "Manage Reservations",
    Icon: CarRental,
    path: paths.careTakerReservationsTable,
  },
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
  {
    label: "Workers Statistics",
    Icon: BarChart,
    path: paths.workersStatistics,
  },
];

export const useSidebarEntries = () => {
  const { hasAdminPermissions, hasCarePermissions } = useUserData();

  if (hasAdminPermissions) return adminSidebarEntries;
  if (hasCarePermissions) return careTakerSidebarEntries;
  return userSidebarEntries;
};
