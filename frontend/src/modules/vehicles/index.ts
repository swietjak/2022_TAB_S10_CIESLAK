import { Module } from "shared/types";
import { reducer } from "./store";
import { MODULE_NAME } from "./strings";

const moduleConfig: Module<typeof MODULE_NAME, typeof reducer> = {
  name: MODULE_NAME,
  reducer,
};

export default moduleConfig;

export { default as vehiclesRoutes } from "./routes";
