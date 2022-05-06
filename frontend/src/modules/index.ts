import home from "./home";
import reservations from "./reservations";
import vehicles from "./vehicles";

export const reducers = {
  // Add reducers below
  [home.name]: home.reducer,
  [reservations.name]: reservations.reducer,
  [vehicles.name]: vehicles.reducer,
};

export { default as ModalRoutes } from "./ModulesRoutes";
