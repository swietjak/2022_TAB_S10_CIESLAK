export interface CreateServicerParams {
  name: string;
  servicePricings: {
    serviceId: number;
    price: number;
  }[];
}

export interface UpdateServicerParams {
  id: number;
  name: string;
  servicePricings: {
    serviceId: number;
    price: number;
  }[];
}

export interface CreateServiceExecutionParams {
  startDate: Date;
  endDate: Date;
  description: string;
  vehicleCareId: number;
  servicePricingId: number;
}
