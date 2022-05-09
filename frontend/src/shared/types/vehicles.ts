export interface Vehicle {
  id: number;
  vin: string;
  brand: string;
  model: string;
  equipments: string[];
}

export interface Equipment {
  id: number;
  amount: number;
}
