import {
  CreateServicerParams,
  UpdateServicerParams,
} from "shared/services/Servicers";
import { ActionSideEffects } from "shared/types";

export interface CreateServicerPayload extends ActionSideEffects {
  params: CreateServicerParams;
}

export interface UpdateServicerPayload extends ActionSideEffects {
  params: UpdateServicerParams;
}
