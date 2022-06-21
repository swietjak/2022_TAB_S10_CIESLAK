import { CreateUserReservationParams } from "shared/services/Reservations";
import { CreateServiceExecutionParams } from "shared/services/Servicers";
import {
  CreateVehicleParams,
  UpdateVehicleParams,
} from "shared/services/Vehicles";
import { ActionSideEffects } from "shared/types";

export interface DeleteVehiclePayload extends ActionSideEffects {
  vehicleId: number;
}

export interface CreateVehiclePayload extends ActionSideEffects {
  params: CreateVehicleParams;
}

export interface UpdateVehiclePayload extends ActionSideEffects {
  params: UpdateVehicleParams;
}

export interface CreateUserReservationPayload extends ActionSideEffects {
  params: CreateUserReservationParams;
}
export interface CreateServiceExecutionPayload extends ActionSideEffects {
  params: CreateServiceExecutionParams;
}
