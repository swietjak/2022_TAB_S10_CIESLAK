import { Vehicle } from "shared/types";
import Api from "../Api";
import { CreateVehicleParams, GetVehiclesParams } from "./Vehicles.types";

class Vehicles extends Api {
  public getVehicles = async (params: GetVehiclesParams) => {
    const { data } = await this.api.get<Vehicle[]>("/Vehicle", { params });
    return data;
  };

  public createVehicle = async (params: CreateVehicleParams) => {
    const { data } = await this.api.post<string>("/Vehicle", params);
    return data;
  };

  public deleteVehicle = async (vehicleId: number) => {
    const { data } = await this.api.delete<string>(`/Vehicle/${vehicleId}`);
    return data;
  };
}

export default Vehicles;
