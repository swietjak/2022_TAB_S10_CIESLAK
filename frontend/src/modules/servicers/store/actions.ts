import { createAsyncThunk } from "@reduxjs/toolkit";
import Servicers from "shared/services/Servicers";
import { MODULE_NAME } from "../strings";
import { CreateServicerPayload, UpdateServicerPayload } from "./actions.types";

const servicers = new Servicers();

export const getServicers = createAsyncThunk(
  `${MODULE_NAME}/getServicers`,
  () => servicers.getServicers()
);

export const getServicer = createAsyncThunk(
  `${MODULE_NAME}/getServicer`,
  (servicerId: number) => servicers.getServicer(servicerId)
);

export const createServicer = createAsyncThunk(
  `${MODULE_NAME}/createServicer`,
  async ({ params, onSuccess }: CreateServicerPayload) => {
    const data = await servicers.createServicer(params);
    if (onSuccess) onSuccess();
    return data;
  }
);

export const updateServicer = createAsyncThunk(
  `${MODULE_NAME}/updateServicer`,
  async ({ params, onSuccess }: UpdateServicerPayload) => {
    const data = await servicers.updateServicer(params);
    if (onSuccess) onSuccess();
    return data;
  }
);
