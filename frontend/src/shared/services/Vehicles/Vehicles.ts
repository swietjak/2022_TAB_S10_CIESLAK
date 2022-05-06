import { Vehicle } from "shared/types";
import Api from "../Api";
import { GetVehiclesParams } from "./Vehicles.types";

class Vehicles extends Api {
  public getVehicles = async (params: GetVehiclesParams) => {
    const { data } = await this.api.get<Vehicle[]>("/Vehicle", { params });
    return data;
  };
}

export default Vehicles;
