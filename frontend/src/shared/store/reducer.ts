import { createReducer } from "@reduxjs/toolkit";
import resource, { Resource } from "shared/resource";
import { LoadingStatus, UserData } from "shared/types";
import { login, resetUserData } from "./actions";

const getUserLocalStorageItem = () => {
  const userItem = localStorage.getItem("user");
  if (!userItem) return null;
  return JSON.parse(userItem) as UserData;
};

export interface State {
  loading: LoadingStatus;
  error?: string | null;
  userData: Resource<UserData | null>;
}

const initialState: State = {
  loading: LoadingStatus.Idle,
  error: null,
  userData: resource.getInitial(getUserLocalStorageItem()),
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(login.pending, (state) => {
      resource.setPending(state.userData);
    })
    .addCase(login.fulfilled, (state, action) => {
      resource.setSucceeded(state.userData, action.payload);
      localStorage.setItem("user", JSON.stringify(action.payload));
    })
    .addCase(login.rejected, (state, action) => {
      resource.setFailed(state.userData, action.error.message);
    })
    .addCase(resetUserData, (state) => {
      resource.reset(state.userData, null);
      localStorage.setItem("user", JSON.stringify(null));
    })
);
