import { createReducer } from "@reduxjs/toolkit";
import resource, { Resource } from "shared/resource";
import { LoadingStatus, Servicer, Vehicle } from "shared/types";
import {
  createServicer,
  getServicer,
  getServicers,
  updateServicer,
} from "./actions";

export interface State {
  loading: LoadingStatus;
  error?: string | null;
  getServicers: Resource<Servicer[]>;
  getServicer: Resource<Servicer>;
  createServicer: Resource<string>;
  updateServicer: Resource<string>;
}

const initialState: State = {
  loading: LoadingStatus.Idle,
  error: null,
  getServicers: resource.getInitial([]),
  getServicer: resource.getInitial(),
  createServicer: resource.getInitial(""),
  updateServicer: resource.getInitial(""),
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(getServicers.pending, (state) => {
      resource.setPending(state.getServicers);
    })
    .addCase(getServicers.fulfilled, (state, action) => {
      resource.setSucceeded(state.getServicers, action.payload);
    })
    .addCase(getServicers.rejected, (state, action) => {
      resource.setFailed(state.getServicers, action.error.message);
    })
    .addCase(getServicer.pending, (state) => {
      resource.setPending(state.getServicer);
    })
    .addCase(getServicer.fulfilled, (state, action) => {
      resource.setSucceeded(state.getServicer, action.payload);
    })
    .addCase(getServicer.rejected, (state, action) => {
      resource.setFailed(state.getServicer, action.error.message);
    })
    .addCase(createServicer.pending, (state) => {
      resource.setPending(state.createServicer);
    })
    .addCase(createServicer.fulfilled, (state, action) => {
      resource.setSucceeded(state.createServicer, action.payload);
    })
    .addCase(createServicer.rejected, (state, action) => {
      resource.setFailed(state.createServicer, action.error.message);
    })
    .addCase(updateServicer.pending, (state) => {
      resource.setPending(state.updateServicer);
    })
    .addCase(updateServicer.fulfilled, (state, action) => {
      resource.setSucceeded(state.updateServicer, action.payload);
    })
    .addCase(updateServicer.rejected, (state, action) => {
      resource.setFailed(state.updateServicer, action.error.message);
    })
);
