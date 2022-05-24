export interface GetUserReservationsParams {
  userId: number;
}

export interface CreateUserReservationParams {
  dateFrom: string;
  dateTo: string;
  workerId: number;
  vehicleId: number;
  description: string;
}
