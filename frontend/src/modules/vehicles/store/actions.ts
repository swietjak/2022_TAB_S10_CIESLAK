import { createAsyncThunk } from "@reduxjs/toolkit";
import { Reservations } from "shared/services";
import Vehicles from "shared/services/Vehicles";
import { GetVehiclesParams } from "shared/services/Vehicles/Vehicles.types";
import { MODULE_NAME } from "../strings";

const vehicles = new Vehicles();

export const getVehicles = createAsyncThunk(
  `${MODULE_NAME}/getVehicles`,
  (params: GetVehiclesParams) => vehicles.getVehicles(params)
);
