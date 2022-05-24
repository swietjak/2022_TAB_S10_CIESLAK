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

export interface VehicleSummary {
  id: number;
  brand: string;
  model: string;
  vin: string;
}
