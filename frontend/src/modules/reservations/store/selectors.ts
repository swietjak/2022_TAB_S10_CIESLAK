import { RootState } from "app/App.store";

export const getUserReservations = (state: RootState) =>
  state.reservations.userReservations;

export const getCareTakerReservations = (state: RootState) =>
  state.reservations.getCareTakerReservations;
