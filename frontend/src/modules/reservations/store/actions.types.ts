import { ActionSideEffects } from "shared/types";

export interface DeleteUserReservationParams extends ActionSideEffects {
  reservationId: number;
}
