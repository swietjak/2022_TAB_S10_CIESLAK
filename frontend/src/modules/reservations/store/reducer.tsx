import { createReducer } from "@reduxjs/toolkit";
import resource, { Resource } from "shared/resource";
import { CareTakerReservation, LoadingStatus } from "shared/types";
import { UserReservation } from "shared/types";
import {
  deleteUserReservation,
  getCareTakerReservations,
  getUserReservations,
} from "./actions";

export interface State {
  loading: LoadingStatus;
  error?: string | null;
  userReservations: Resource<UserReservation[]>;
  deleteUserReservation: Resource<string>;
  getCareTakerReservations: Resource<CareTakerReservation[]>;
}

const initialState: State = {
  loading: LoadingStatus.Idle,
  error: null,
  userReservations: resource.getInitial([]),
  deleteUserReservation: resource.getInitial(""),
  getCareTakerReservations: resource.getInitial([]),
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
);
