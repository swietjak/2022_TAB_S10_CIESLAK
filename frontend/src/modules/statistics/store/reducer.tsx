import { createReducer } from "@reduxjs/toolkit";
import resource, { Resource } from "shared/resource";
import { LoadingStatus, WorkerStatistics } from "shared/types";
import { getWorkersStatistics } from "./actions";

export interface State {
  loading: LoadingStatus;
  error?: string | null;
  getWorkersStatistics: Resource<WorkerStatistics[]>;
}

const initialState: State = {
  loading: LoadingStatus.Idle,
  error: null,
  getWorkersStatistics: resource.getInitial([]),
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(getWorkersStatistics.pending, (state) => {
      resource.setPending(state.getWorkersStatistics);
    })
    .addCase(getWorkersStatistics.fulfilled, (state, action) => {
      resource.setSucceeded(state.getWorkersStatistics, action.payload);
    })
    .addCase(getWorkersStatistics.rejected, (state, action) => {
      resource.setFailed(state.getWorkersStatistics, action.error.message);
    })
);
