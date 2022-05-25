import { ActionSideEffects } from "shared/types";
import { CreateUserRentalParams } from "shared/services/Rentals";

export interface DeleteUserReservationParams extends ActionSideEffects {
  reservationId: number;
}

export interface CreateUserRentalPayload extends ActionSideEffects {
  params: CreateUserRentalParams;
}
