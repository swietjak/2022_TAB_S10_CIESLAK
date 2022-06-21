import { paths } from "config";
import VehiclesForm from "./components/VehiclesForm";
import {
  AdminVehiclesList,
  CareTakerVehiclesList,
  VehicleEdit,
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
  {
    path: paths.vehiclesEdit,
    element: () => <VehicleEdit />,
  },
];

export default routes;
