import { Entity } from "./data";

interface Servicesummary extends Entity {
  price: number;
}

export interface Servicer extends Entity {
  servicesSummary: Servicesummary[];
}
