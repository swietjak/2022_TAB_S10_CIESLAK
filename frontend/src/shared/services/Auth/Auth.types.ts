import { UserData } from "shared/types";

export interface LoginParams {
  login: string;
  password: string;
}

export type LoginResponse = UserData;
