import { CreateUserReservationParams } from "shared/services/Reservations";
import { CreateVehicleParams } from "shared/services/Vehicles";
import { ActionSideEffects } from "shared/types";

export interface DeleteVehiclePayload extends ActionSideEffects {
  vehicleId: number;
}

export interface CreateVehiclePayload extends ActionSideEffects {
  params: CreateVehicleParams;
}

export interface CreateUserReservationPayload extends ActionSideEffects {
  params: CreateUserReservationParams;
}
