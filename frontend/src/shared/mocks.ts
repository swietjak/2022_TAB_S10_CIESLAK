import { FieldValue, Vehicle } from "./types";

export const reservationsMock = [
  {
    reservationId: 1,
    carName: "BMW HWDP",
    description: "xddd",
  },
  {
    reservationId: 2,
    carName: "audi",
    description: "xddd",
  },
  {
    reservationId: 3,
    carName: "maseratti",
  },
  {
    reservationId: 4,
    carName: "paseratti",
    description: "xddd",
  },
];

export const equipmentsOptionsMock: FieldValue[] = [
  { value: 1, label: "test1" },
  { value: 2, label: "test2" },
  { value: 3, label: "test3" },
];

export const vehiclesMock: Vehicle[] = [
  {
    brand: "Audi",
    equipments: ["test1", "test2"],
    id: 1,
    model: "A4",
    vin: "1234",
  },
  {
    brand: "Audi",
    equipments: ["test1", "test2"],
    id: 2,
    model: "A5",
    vin: "1234",
  },
  {
    brand: "Audi",
    equipments: ["test1", "test2"],
    id: 3,
    model: "A6",
    vin: "1234",
  },
  {
    brand: "Audi",
    equipments: ["test1", "test2"],
    id: 1,
    model: "A4",
    vin: "1234",
  },
];
