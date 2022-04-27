import home from "./home";
import reservations from "./reservations";

export const reducers = {
  // Add reducers below
  [home.name]: home.reducer,
  [reservations.name]: reservations.reducer,
};

export { default as ModalRoutes } from "./ModulesRoutes";
