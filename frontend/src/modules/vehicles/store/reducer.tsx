import { createReducer } from "@reduxjs/toolkit";
import resource, { Resource } from "shared/resource";
import { LoadingStatus, Vehicle } from "shared/types";
import { createVehicle, deleteVehicle, getVehicles } from "./actions";

export interface State {
  loading: LoadingStatus;
  error?: string | null;
  getVehicles: Resource<Vehicle[]>;
  createVehicle: Resource<string>;
  deleteVehicle: Resource<string>;
}

const initialState: State = {
  loading: LoadingStatus.Idle,
  error: null,
  getVehicles: resource.getInitial([]),
  createVehicle: resource.getInitial(""),
  deleteVehicle: resource.getInitial(""),
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(getVehicles.pending, (state) => {
      resource.setPending(state.getVehicles);
    })
    .addCase(getVehicles.fulfilled, (state, action) => {
      resource.setSucceeded(state.getVehicles, action.payload);
    })
    .addCase(getVehicles.rejected, (state, action) => {
      resource.setFailed(state.getVehicles, action.error.message);
    })
    .addCase(createVehicle.pending, (state) => {
      resource.setPending(state.createVehicle);
    })
    .addCase(createVehicle.fulfilled, (state, action) => {
      resource.setSucceeded(state.createVehicle, action.payload);
    })
    .addCase(createVehicle.rejected, (state, action) => {
      resource.setFailed(state.createVehicle, action.error.message);
    })
    .addCase(deleteVehicle.pending, (state) => {
      resource.setPending(state.deleteVehicle);
    })
    .addCase(deleteVehicle.fulfilled, (state, action) => {
      resource.setSucceeded(state.deleteVehicle, action.payload);
    })
    .addCase(deleteVehicle.rejected, (state, action) => {
      resource.setFailed(state.deleteVehicle, action.error.message);
    })
);
