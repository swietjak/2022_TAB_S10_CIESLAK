import { paths } from "config";
import { VehiclesForm, VehiclesList } from "./pages";

const routes = [
  {
    path: paths.vehiclesForm,
    element: () => <VehiclesForm />,
  },
  {
    path: paths.vehiclesList,
    element: () => <VehiclesList />,
  },
];

export default routes;
