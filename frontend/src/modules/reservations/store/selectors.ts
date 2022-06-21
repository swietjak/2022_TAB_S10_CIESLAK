import { RootState } from "app/App.store";

export const getUserReservations = (state: RootState) =>
  state.reservations.userReservations;

export const getCareTakerReservations = (state: RootState) =>
  state.reservations.getCareTakerReservations;

export const getCareTakerRentals = (state: RootState) =>
  state.reservations.getCareTakerRentals;

export const getReservationArchive = (state: RootState) =>
  state.reservations.getReservationArchive;
