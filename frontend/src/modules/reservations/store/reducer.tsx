import { createReducer } from "@reduxjs/toolkit";
import resource, { Resource } from "shared/resource";
import {
  CareTakerReservation,
  LoadingStatus,
  ReservationArchive,
} from "shared/types";
import { UserReservation } from "shared/types";
import { Rental } from "shared/types";
import {
  createVehicleReturn,
  deleteUserReservation,
  getCareTakerRentals,
  getCareTakerReservations,
  getReservationArchive,
  getUserReservations,
} from "./actions";

export interface State {
  loading: LoadingStatus;
  error?: string | null;
  userReservations: Resource<UserReservation[]>;
  deleteUserReservation: Resource<string>;
  getCareTakerReservations: Resource<CareTakerReservation[]>;
  getCareTakerRentals: Resource<Rental[]>;
  createVehicleReturn: Resource<string>;
  getReservationArchive: Resource<ReservationArchive[]>;
}

const initialState: State = {
  loading: LoadingStatus.Idle,
  error: null,
  userReservations: resource.getInitial([]),
  deleteUserReservation: resource.getInitial(""),
  getCareTakerReservations: resource.getInitial([]),
  getCareTakerRentals: resource.getInitial([]),
  getReservationArchive: resource.getInitial([]),
  createVehicleReturn: resource.getInitial(""),
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(getUserReservations.pending, (state) => {
      resource.setPending(state.userReservations);
    })
    .addCase(getUserReservations.fulfilled, (state, action) => {
      resource.setSucceeded(state.userReservations, action.payload);
    })
    .addCase(getUserReservations.rejected, (state, action) => {
      resource.setFailed(state.userReservations, action.error.message);
    })
    .addCase(deleteUserReservation.pending, (state) => {
      resource.setPending(state.deleteUserReservation);
    })
    .addCase(deleteUserReservation.fulfilled, (state, action) => {
      resource.setSucceeded(state.deleteUserReservation, action.payload);
    })
    .addCase(deleteUserReservation.rejected, (state, action) => {
      resource.setFailed(state.deleteUserReservation, action.error.message);
    })
    .addCase(getCareTakerReservations.pending, (state) => {
      resource.setPending(state.getCareTakerReservations);
    })
    .addCase(getCareTakerReservations.fulfilled, (state, action) => {
      resource.setSucceeded(state.getCareTakerReservations, action.payload);
    })
    .addCase(getCareTakerReservations.rejected, (state, action) => {
      resource.setFailed(state.getCareTakerReservations, action.error.message);
    })
    .addCase(getCareTakerRentals.pending, (state) => {
      resource.setPending(state.getCareTakerRentals);
    })
    .addCase(getCareTakerRentals.fulfilled, (state, action) => {
      resource.setSucceeded(state.getCareTakerRentals, action.payload);
    })
    .addCase(getCareTakerRentals.rejected, (state, action) => {
      resource.setFailed(state.getCareTakerRentals, action.error.message);
    })
    .addCase(getReservationArchive.pending, (state) => {
      resource.setPending(state.getReservationArchive);
    })
    .addCase(getReservationArchive.fulfilled, (state, action) => {
      resource.setSucceeded(state.getReservationArchive, action.payload);
    })
    .addCase(getReservationArchive.rejected, (state, action) => {
      resource.setFailed(state.getReservationArchive, action.error.message);
    })
    .addCase(createVehicleReturn.pending, (state) => {
      resource.setPending(state.createVehicleReturn);
    })
    .addCase(createVehicleReturn.fulfilled, (state, action) => {
      resource.setSucceeded(state.createVehicleReturn, action.payload);
    })
    .addCase(createVehicleReturn.rejected, (state, action) => {
      resource.setFailed(state.createVehicleReturn, action.error.message);
    })
);
