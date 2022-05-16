import { vehiclesMock } from "shared/mocks";
import { Vehicle } from "shared/types";
import Api from "../Api";
import { CreateVehicleParams, GetVehiclesParams } from "./Vehicles.types";

class Vehicles extends Api {
  public getVehicles = async (params: GetVehiclesParams) => {
    // const { data } = await this.api.get<Vehicle[]>("/Vehicle", { params });
    const { data } = await new Promise((resolve) => {
      setTimeout(() => resolve({ data: vehiclesMock }), 100);
    });
    return data;
  };

  public createVehicle = async (params: CreateVehicleParams) => {
    const { data } = await this.api.post<string>("/Vehicle", params);
    return data;
  };
}

export default Vehicles;
