import { createAsyncThunk } from "@reduxjs/toolkit";
import Reservations from "shared/services/Reservations";
import { MODULE_NAME } from "../strings";
import { DeleteUserReservationParams } from "./actions.types";

const reservations = new Reservations();

export const getUserReservations = createAsyncThunk(
  `${MODULE_NAME}/getUserReservations`,
  (userId: number) => reservations.getUserReservations(userId)
);

export const deleteUserReservation = createAsyncThunk(
  `${MODULE_NAME}/deleteUserReservation`,
  async ({ reservationId, onSuccess }: DeleteUserReservationParams) => {
    const data = await reservations.deleteUserReservation(reservationId);
    if (onSuccess) onSuccess();
    return data;
  }
);

export const getCareTakerReservations = createAsyncThunk(
  `${MODULE_NAME}/getCareTakerReservations`,
  (careTakerId: number) => reservations.getCareTakerReservations(careTakerId)
);
