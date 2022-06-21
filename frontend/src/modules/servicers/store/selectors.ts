import { RootState } from "app/App.store";

export const getServicers = (state: RootState) => state.servicers.getServicers;

export const getServicer = (state: RootState) => state.servicers.getServicer;

export const getAvailableVehicles = (state: RootState) =>
  state.vehicles.getAvailableVehicles;
