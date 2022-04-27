import { LoadingStatus } from "shared/types";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

export interface PaginationData {
  count: number;
  take: number;
  skip: number;
}

export type Meta = Partial<PaginationData> | null;

export type ResourceActionCreator<Payload> = (
  payload: Payload
) => AnyAction | AsyncThunkAction<{ data: any; meta?: Meta }, Payload, any>;

export interface SideEffects {
  loading: LoadingStatus;
  error?: string | null;
  isInitialized: boolean;
  meta?: Meta;
}

export interface Resource<T = undefined, K = any> extends SideEffects {
  data: T;
  args: K;
}

export interface ResourceDraft {
  getInitial: <T>(initialState?: T) => Resource<T>;
  setPending: <T, K = any>(resource: Resource<T>, refreshPayload?: K) => void;
  setSucceeded: <T>(
    resource: Resource<T>,
    data?: T,
    meta?: Partial<PaginationData>
  ) => void;
  setFailed: <T>(resource: Resource<T>, error?: string | null) => void;
  reset: <T>(resource: Resource<T>, initialState?: T) => void;
}

export interface ResourceData<Data, Payload> extends Resource<Data> {
  getData: ResourceActionCreator<Payload>;
}
