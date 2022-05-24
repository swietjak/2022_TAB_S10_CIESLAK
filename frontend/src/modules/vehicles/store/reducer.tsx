import { createReducer } from "@reduxjs/toolkit";
import resource, { Resource } from "shared/resource";
import { LoadingStatus, Vehicle } from "shared/types";
import {
  createUserReservation,
  createVehicle,
  deleteVehicle,
  getAvailableVehicles,
  getVehicles,
} from "./actions";

export interface State {
  loading: LoadingStatus;
  error?: string | null;
  getVehicles: Resource<Vehicle[]>;
  getAvailableVehicles: Resource<Vehicle[]>;
  createVehicle: Resource<string>;
  deleteVehicle: Resource<string>;
  createUserReservation: Resource<string>;
}

const initialState: State = {
  loading: LoadingStatus.Idle,
  error: null,
  getVehicles: resource.getInitial([]),
  getAvailableVehicles: resource.getInitial([]),
  createVehicle: resource.getInitial(""),
  deleteVehicle: resource.getInitial(""),
  createUserReservation: resource.getInitial(""),
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
    .addCase(getAvailableVehicles.pending, (state) => {
      resource.setPending(state.getAvailableVehicles);
    })
    .addCase(getAvailableVehicles.fulfilled, (state, action) => {
      resource.setSucceeded(state.getAvailableVehicles, action.payload);
    })
    .addCase(getAvailableVehicles.rejected, (state, action) => {
      resource.setFailed(state.getAvailableVehicles, action.error.message);
    })
    .addCase(createUserReservation.pending, (state) => {
      resource.setPending(state.createUserReservation);
    })
    .addCase(createUserReservation.fulfilled, (state, action) => {
      resource.setSucceeded(state.createUserReservation, action.payload);
    })
    .addCase(createUserReservation.rejected, (state, action) => {
      resource.setFailed(state.createUserReservation, action.error.message);
    })
);
