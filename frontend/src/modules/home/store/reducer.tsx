import { createReducer } from "@reduxjs/toolkit";
import { LoadingStatus } from "shared/types";
import { decrementAction, incrementAction } from "./actions";

export interface State {
  loading: LoadingStatus;
  error?: string | null;
  demoNumber: number;
}

const initialState: State = {
  loading: LoadingStatus.Idle,
  error: null,
  demoNumber: 0,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(incrementAction, (state) => {
      state.demoNumber += 1;
    })
    .addCase(decrementAction, (state) => {
      state.demoNumber -= 1;
    })
);
