import { createAsyncThunk } from "@reduxjs/toolkit";
import { Reservations } from "shared/services";
import { MODULE_NAME } from "../strings";

const reservations = new Reservations();

export const getUserReservations = createAsyncThunk(
  `${MODULE_NAME}/getUserReservations`,
  () => reservations.getUserReservations()
);
