import { RootState } from "app/App.store";

export const getVehicles = (state: RootState) => state.vehicles.getVehicles;

export const getAvailableVehicles = (state: RootState) =>
  state.vehicles.getAvailableVehicles;
