import { VehicleSummary } from "./data";

export enum ReservationStatus {
  Pending = "PENDING",
  Finished = "FINISHED",
  Started = "STARTED",
}

export interface UserReservation {
  id: number;
  dateFrom: string;
  dateTo: string;
  vehicleSummary: VehicleSummary;
  description: string;
  status: ReservationStatus;
}

export interface CareTakerReservation {
  id: number;
  dateFrom: string;
  dateTo: string;
  vehicleSummary: VehicleSummary;
  workerName: string;
  workerSurname: string;
}

export interface ReservationArchive {
  id: number;
  rentalStartDate: string;
  rentalEndDate: string;
  dateFrom: string;
  dateTo: string;
  vehicleSummary: VehicleSummary;
  fuelConsumed: number;
  kmCovered: number;
  workerName: string;
  workerSurname: string;
}
