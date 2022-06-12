import { Entity } from "./data";

export interface Vehicle {
  id: number;
  vin: string;
  brand: string;
  model: string;
  equipments: string[];
  status?: VehicleStatus;
  vehicleCareId?: number;
}

export enum VehicleStatus {
  Available = "AVAILABLE",
  Rented = "RENTED",
  Absent = "ABSENT",
  Reserved = "RESERVED",
}

export interface Equipment {
  id: number;
  amount: number;
}

export interface EquipmentDetails extends Entity {
  amount: number;
}

export interface VehicleDetails {
  id: number;
  vin: string;
  brand: string;
  model: string;
  engineCapacity: number;
  enginePower: number;
  equipments: EquipmentDetails[];
}

export interface ServiceExecution {
  id: number;
  startDate: string;
  endDate: string;
  description: string;
  isFinished: true;
  servicePricingId: number;
  price: number;
  serviceName: string;
  externalServicerName: string;
}

export interface VehicleStatistics {
  totalReservations: number;
  totalRentals: number;
  totalExecutions: number;
  totalPrice: number;
  totalFuel: number;
  totalKilometers: number;
}
