import { VehicleSummary } from "./data";

export interface Reservat {
  id: number;
  vin: string;
  brand: string;
  model: string;
  equipments: string[];
}

export interface Rental {
  id: number;
  rentalStartDate: string;
  dateFrom: string;
  dateTo: string;
  vehicleSummary: VehicleSummary;
  workerName: string;
  workerSurname: string;
}
