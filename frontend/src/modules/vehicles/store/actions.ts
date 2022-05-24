import { createAsyncThunk } from "@reduxjs/toolkit";
import Reservations from "shared/services/Reservations";
import Vehicles, { GetAvailableVehiclesParams } from "shared/services/Vehicles";
import { GetVehiclesParams } from "shared/services/Vehicles";
import { MODULE_NAME } from "../strings";
import {
  CreateUserReservationPayload,
  CreateVehiclePayload,
  DeleteVehiclePayload,
} from "./actions.types";

const vehicles = new Vehicles();
const reservations = new Reservations();

export const getVehicles = createAsyncThunk(
  `${MODULE_NAME}/getVehicles`,
  (params: GetVehiclesParams) => vehicles.getVehicles(params)
);

export const getAvailableVehicles = createAsyncThunk(
  `${MODULE_NAME}/getAvaibleVehicles`,
  (params: GetAvailableVehiclesParams) => vehicles.getAvailableVehicles(params)
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

export const createUserReservation = createAsyncThunk(
  `${MODULE_NAME}/createUserReservation`,
  async ({ onSuccess, params }: CreateUserReservationPayload) => {
    const data = await reservations.createUserReservation(params);
    if (onSuccess) onSuccess();
    return data;
  }
);
