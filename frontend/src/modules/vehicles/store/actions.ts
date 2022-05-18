import { createAsyncThunk } from "@reduxjs/toolkit";
import Vehicles from "shared/services/Vehicles";
import { GetVehiclesParams } from "shared/services/Vehicles";
import { MODULE_NAME } from "../strings";
import { CreateVehiclePayload, DeleteVehiclePayload } from "./actions.types";

const vehicles = new Vehicles();

export const getVehicles = createAsyncThunk(
  `${MODULE_NAME}/getVehicles`,
  (params: GetVehiclesParams) => vehicles.getVehicles(params)
);

export const createVehicle = createAsyncThunk(
  `${MODULE_NAME}/createVehicle`,
  async ({ params, onSuccess }: CreateVehiclePayload) => {
    const data = vehicles.createVehicle(params);
    if (onSuccess) onSuccess();
    return data;
  }
);

export const deleteVehicle = createAsyncThunk(
  `${MODULE_NAME}/deleteVehicle`,
  async ({ vehicleId, onSuccess }: DeleteVehiclePayload) => {
    const data = await vehicles.deleteVehicle(vehicleId);
    if (onSuccess) onSuccess();
    return data;
  }
);
