import home from "./home";
import reservations from "./reservations";
import servicers from "./servicers";
import vehicles from "./vehicles";

export const reducers = {
  // Add reducers below
  [home.name]: home.reducer,
  [reservations.name]: reservations.reducer,
  [vehicles.name]: vehicles.reducer,
  [servicers.name]: servicers.reducer,
};

export { default as ModalRoutes } from "./ModulesRoutes";
