import { createReducer } from "@reduxjs/toolkit";
import resource, { Resource } from "shared/resource";
import { LoadingStatus, UserData } from "shared/types";
import { login } from "./actions";

export interface State {
  loading: LoadingStatus;
  error?: string | null;
  userData: Resource<UserData>;
}

const initialState: State = {
  loading: LoadingStatus.Idle,
  error: null,
  userData: resource.getInitial(),
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(login.pending, (state) => {
      resource.setPending(state.userData);
    })
    .addCase(login.fulfilled, (state, action) => {
      resource.setSucceeded(state.userData, action.payload);
    })
    .addCase(login.rejected, (state, action) => {
      resource.setFailed(state.userData, action.error.message);
    })
);
