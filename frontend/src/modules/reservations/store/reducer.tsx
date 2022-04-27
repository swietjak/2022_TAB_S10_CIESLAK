import { createReducer } from "@reduxjs/toolkit";
import resource, { Resource } from "shared/resource";
import { LoadingStatus } from "shared/types";
import { UserReservation } from "shared/types/reservations";
import { getUserReservations } from "./actions";

export interface State {
  loading: LoadingStatus;
  error?: string | null;
  userReservations: Resource<UserReservation[]>;
}

const initialState: State = {
  loading: LoadingStatus.Idle,
  error: null,
  userReservations: resource.getInitial([]),
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
);
