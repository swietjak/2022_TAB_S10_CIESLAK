import {
  Entity,
  Vehicle,
  VehicleDetails,
  VehicleStatistics,
} from "shared/types";
import Api from "../Api";
import {
  CreateVehicleParams,
  GetAvailableVehiclesParams,
  GetVehiclesParams,
  UpdateVehicleParams,
} from "./Vehicles.types";

class Vehicles extends Api {
  public getVehicles = async (params: GetVehiclesParams) => {
    const { data } = await this.api.get<Vehicle[]>("/Vehicle", { params });
    return data;
  };

  public getEquipments = async () => {
    const { data } = await this.api.get<Entity[]>("/Equipment");
    return data;
  };

  public getVehicleDetails = async (vehicleId: number) => {
    const { data } = await this.api.get<VehicleDetails>(
      `/Vehicle/${vehicleId}`
    );
    return data;
  };

  public getVehicleStatistics = async (vehicleId: number) => {
    const { data } = await this.api.get<VehicleStatistics>(
      `/Vehicle/${vehicleId}/statistics`
    );
    return data;
  };

  public getCareTakerVehicles = async (careTakerId: number) => {
    const { data } = await this.api.get<Vehicle[]>(
      `/Vehicle/care-taker-vehicles/${careTakerId}`
    );
    return data;
  };

  public getAvailableVehicles = async (params: GetAvailableVehiclesParams) => {
    const { data } = await this.api.get<Vehicle[]>("/Vehicle/available", {
      params,
    });
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

  public updateVehicle = async ({ id, ...params }: UpdateVehicleParams) => {
    const { data } = await this.api.put<string>(`/Vehicle/${id}`, params);
    return data;
  };
}

export default Vehicles;
