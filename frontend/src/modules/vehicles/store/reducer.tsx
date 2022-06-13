import { createReducer } from "@reduxjs/toolkit";
import resource, { Resource } from "shared/resource";
import {
  LoadingStatus,
  ServiceExecution,
  Vehicle,
  VehicleDetails,
  VehicleStatistics,
} from "shared/types";
import {
  createServiceExecution,
  createUserReservation,
  createVehicle,
  deleteVehicle,
  finishServiceExecution,
  getAvailableVehicles,
  getCareTakerVehicles,
  getServiceExecutionsByVehicleId,
  getVehicleDetails,
  getVehicles,
  getVehicleStatistics,
  resetVehicles,
  updateVehicle,
} from "./actions";

export interface State {
  loading: LoadingStatus;
  error?: string | null;
  getVehicles: Resource<Vehicle[]>;
  getVehicleDetails: Resource<VehicleDetails>;
  getVehicleStatistics: Resource<VehicleStatistics>;
  getAvailableVehicles: Resource<Vehicle[]>;
  createVehicle: Resource<string>;
  finishServiceExecution: Resource<string>;
  deleteVehicle: Resource<string>;
  updateVehicle: Resource<string>;
  createUserReservation: Resource<string>;
  getCareTakerVehicles: Resource<Vehicle[]>;
  getServiceExecutionsByVehicleId: Resource<ServiceExecution[]>;
  createServiceExecution: Resource<string>;
}

const initialState: State = {
  loading: LoadingStatus.Idle,
  error: null,
  getVehicles: resource.getInitial([]),
  getVehicleDetails: resource.getInitial<VehicleDetails>(),
  getVehicleStatistics: resource.getInitial<VehicleStatistics>(),
  getAvailableVehicles: resource.getInitial([]),
  createVehicle: resource.getInitial(""),
  finishServiceExecution: resource.getInitial(""),
  deleteVehicle: resource.getInitial(""),
  updateVehicle: resource.getInitial(""),
  createUserReservation: resource.getInitial(""),
  getCareTakerVehicles: resource.getInitial([]),
  getServiceExecutionsByVehicleId: resource.getInitial([]),
  createServiceExecution: resource.getInitial(""),
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
    .addCase(resetVehicles, (state) => {
      resource.reset(state.getVehicles, []);
    })
    .addCase(getVehicleDetails.pending, (state) => {
      resource.setPending(state.getVehicleDetails);
    })
    .addCase(getVehicleDetails.fulfilled, (state, action) => {
      resource.setSucceeded(state.getVehicleDetails, action.payload);
    })
    .addCase(getVehicleDetails.rejected, (state, action) => {
      resource.setFailed(state.getVehicleDetails, action.error.message);
    })
    .addCase(getVehicleStatistics.pending, (state) => {
      resource.setPending(state.getVehicleStatistics);
    })
    .addCase(getVehicleStatistics.fulfilled, (state, action) => {
      resource.setSucceeded(state.getVehicleStatistics, action.payload);
    })
    .addCase(getVehicleStatistics.rejected, (state, action) => {
      resource.setFailed(state.getVehicleStatistics, action.error.message);
    })
    .addCase(getServiceExecutionsByVehicleId.pending, (state) => {
      resource.setPending(state.getServiceExecutionsByVehicleId);
    })
    .addCase(getServiceExecutionsByVehicleId.fulfilled, (state, action) => {
      resource.setSucceeded(
        state.getServiceExecutionsByVehicleId,
        action.payload
      );
    })
    .addCase(getServiceExecutionsByVehicleId.rejected, (state, action) => {
      resource.setFailed(
        state.getServiceExecutionsByVehicleId,
        action.error.message
      );
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
    .addCase(finishServiceExecution.pending, (state) => {
      resource.setPending(state.finishServiceExecution);
    })
    .addCase(finishServiceExecution.fulfilled, (state, action) => {
      state.getServiceExecutionsByVehicleId.data =
        state.getServiceExecutionsByVehicleId.data.map((execution) =>
          action.meta.arg === execution.id
            ? { ...execution, isFinished: true }
            : execution
        );

      resource.setSucceeded(state.finishServiceExecution, action.payload);
    })
    .addCase(finishServiceExecution.rejected, (state, action) => {
      resource.setFailed(state.finishServiceExecution, action.error.message);
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
    .addCase(updateVehicle.pending, (state) => {
      resource.setPending(state.updateVehicle);
    })
    .addCase(updateVehicle.fulfilled, (state, action) => {
      resource.setSucceeded(state.updateVehicle, action.payload);
    })
    .addCase(updateVehicle.rejected, (state, action) => {
      resource.setFailed(state.updateVehicle, action.error.message);
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
    .addCase(getCareTakerVehicles.pending, (state) => {
      resource.setPending(state.getCareTakerVehicles);
    })
    .addCase(getCareTakerVehicles.fulfilled, (state, action) => {
      resource.setSucceeded(state.getCareTakerVehicles, action.payload);
    })
    .addCase(getCareTakerVehicles.rejected, (state, action) => {
      resource.setFailed(state.getCareTakerVehicles, action.error.message);
    })
    .addCase(createServiceExecution.pending, (state) => {
      resource.setPending(state.createServiceExecution);
    })
    .addCase(createServiceExecution.fulfilled, (state, action) => {
      resource.setSucceeded(state.createServiceExecution, action.payload);
    })
    .addCase(createServiceExecution.rejected, (state, action) => {
      resource.setFailed(state.createServiceExecution, action.error.message);
    })
);
