import home from "./home";

export const reducers = {
  // Add reducers below
  [home.name]: home.reducer,
};

export const routes = [...home.routes];
