import { RootState } from "app/App.store";

export const getVehicles = (state: RootState) => state.vehicles.getVehicles;

export const getVehicleDetails = (state: RootState) =>
  state.vehicles.getVehicleDetails;

export const getVehicleStatistics = (state: RootState) =>
  state.vehicles.getVehicleStatistics;

export const getServiceExecutionsByVehicleId = (state: RootState) =>
  state.vehicles.getServiceExecutionsByVehicleId;

export const getAvailableVehicles = (state: RootState) =>
  state.vehicles.getAvailableVehicles;

export const getCareTakerVehicles = (state: RootState) =>
  state.vehicles.getCareTakerVehicles;

export const createServiceExecution = (state: RootState) =>
  state.vehicles.createServiceExecution;
