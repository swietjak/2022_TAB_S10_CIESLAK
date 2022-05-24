import { Equipment } from "shared/types";

export interface GetVehiclesParams {
  brand?: string;
}

export interface GetAvailableVehiclesParams {
  brand?: string;
  startDate: string;
  endDate: string;
}

export interface CreateVehicleParams {
  brand: string;
  model: string;
  vin: string;
  enginePower: number;
  engineCapacity: number;
  equipments: Equipment[];
}
