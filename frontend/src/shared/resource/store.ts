import { LoadingStatus } from "shared/types";
import { Meta } from ".";
import type { Resource, ResourceDraft } from "./types";

const getInitial = <T>(initialState?: T): Resource<T> => ({
  data: initialState as T,
  loading: LoadingStatus.Idle,
  error: null,
  isInitialized: false,
  meta: null,
  args: null,
});

const setPending = <T, K = any>(resource: Resource<T>, args?: K) => {
  resource.loading = LoadingStatus.Pending;
  resource.error = null;
  resource.args = args;
};

const setSucceeded = <T = undefined>(
  resource: Resource<T | undefined>,
  data?: T,
  meta?: Meta
) => {
  resource.loading = LoadingStatus.Succeeded;
  resource.isInitialized = true;
  resource.meta = meta;
  if (typeof data !== "undefined") {
    resource.data = data;
  }
};

const setFailed = <T>(resource: Resource<T>, error?: string | null) => {
  resource.loading = LoadingStatus.Failed;
  resource.error = error;
  resource.isInitialized = true;
};

const reset = <T>(resource: Resource<T>, initialState?: T) => {
  resource.data = initialState as T;
  resource.loading = LoadingStatus.Idle;
  resource.error = null;
  resource.isInitialized = false;
  resource.meta = null;
};

const resource: ResourceDraft = {
  getInitial,
  setPending,
  setSucceeded,
  setFailed,
  reset,
};

export default resource;
