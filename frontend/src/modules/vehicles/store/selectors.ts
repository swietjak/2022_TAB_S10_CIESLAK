import { RootState } from "app/App.store";

export const getVehicles = (state: RootState) => state.vehicles.getVehicles;
