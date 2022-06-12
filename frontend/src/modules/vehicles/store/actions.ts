import { createAsyncThunk } from "@reduxjs/toolkit";
import Reservations from "shared/services/Reservations";
import Vehicles, { GetAvailableVehiclesParams } from "shared/services/Vehicles";
import { GetVehiclesParams } from "shared/services/Vehicles";
import Servicers from "shared/services/Servicers";
import { MODULE_NAME } from "../strings";
import {
  CreateServiceExecutionPayload,
  CreateUserReservationPayload,
  CreateVehiclePayload,
  DeleteVehiclePayload,
  UpdateVehiclePayload,
} from "./actions.types";

const vehicles = new Vehicles();
const reservations = new Reservations();
const servicers = new Servicers();

export const getVehicles = createAsyncThunk(
  `${MODULE_NAME}/getVehicles`,
  (params: GetVehiclesParams) => vehicles.getVehicles(params)
);

export const getVehicleDetails = createAsyncThunk(
  `${MODULE_NAME}/getVehicleDetails`,
  (vehicleId: number) => vehicles.getVehicleDetails(vehicleId)
);

export const getVehicleStatistics = createAsyncThunk(
  `${MODULE_NAME}/getVehicleStatistics`,
  (vehicleId: number) => vehicles.getVehicleStatistics(vehicleId)
);

export const getServiceExecutionsByVehicleId = createAsyncThunk(
  `${MODULE_NAME}/getServiceExecutionsByVehicleId`,
  (vehicleId: number) => servicers.getServiceExecutionsByVehicleId(vehicleId)
);

export const finishServiceExecution = createAsyncThunk(
  `${MODULE_NAME}/finishServiceExecution`,
  (vehicleId: number) => servicers.finishServiceExecution(vehicleId)
);

export const getAvailableVehicles = createAsyncThunk(
  `${MODULE_NAME}/getAvaibleVehicles`,
  (params: GetAvailableVehiclesParams) => vehicles.getAvailableVehicles(params)
);

export const getCareTakerVehicles = createAsyncThunk(
  `${MODULE_NAME}/getCareTakerVehicles`,
  (careTakerId: number) => vehicles.getCareTakerVehicles(careTakerId)
);

export const createVehicle = createAsyncThunk(
  `${MODULE_NAME}/createVehicle`,
  async ({ params, onSuccess }: CreateVehiclePayload) => {
    const data = await vehicles.createVehicle(params);
    if (onSuccess) onSuccess();
    return data;
  }
);

export const updateVehicle = createAsyncThunk(
  `${MODULE_NAME}/updateVehicle`,
  async ({ params, onSuccess }: UpdateVehiclePayload) => {
    const data = await vehicles.updateVehicle(params);
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

export const createServiceExecution = createAsyncThunk(
  `${MODULE_NAME}/createServiceExecution`,
  async ({ onSuccess, params }: CreateServiceExecutionPayload) => {
    const data = await servicers.createServiceExecution(params);
    if (onSuccess) onSuccess();
    return data;
  }
);
