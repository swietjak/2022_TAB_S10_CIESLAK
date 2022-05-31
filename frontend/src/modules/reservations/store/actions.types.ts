import { ActionSideEffects } from "shared/types";
import { CreateUserRentalParams } from "shared/services/Rentals";
import { CreateVehicleReturnParams } from "shared/services/VehicleReturns";

export interface DeleteUserReservationParams extends ActionSideEffects {
  reservationId: number;
}

export interface CreateUserRentalPayload extends ActionSideEffects {
  params: CreateUserRentalParams;
}

export interface CreateVehicleReturnPayload extends ActionSideEffects {
  params: CreateVehicleReturnParams;
}
