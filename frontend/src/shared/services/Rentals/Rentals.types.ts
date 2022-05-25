export interface GetUserReservationsParams {
  userId: number;
}

export interface CreateUserRentalParams {
  date: string;
  reservationId: number;
  meterIndicator: number;
  description: string;
}
