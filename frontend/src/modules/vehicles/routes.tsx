import { paths } from "config";
import {
  VehiclesForm,
  AdminVehiclesList,
  CareTakerVehiclesList,
  WorkerVehiclesList,
} from "./pages";

const routes = [
  {
    path: paths.vehiclesForm,
    element: () => <VehiclesForm />,
  },
  {
    path: paths.adminVehiclesList,
    element: () => <AdminVehiclesList />,
  },
  {
    path: paths.careTakerVehiclesList,
    element: () => <CareTakerVehiclesList />,
  },
  {
    path: paths.workerVehiclesList,
    element: () => <WorkerVehiclesList />,
  },
];

export default routes;
