import { Entity, ServiceExecution, Servicer } from "shared/types";
import Api from "../Api";
import {
  CreateServiceExecutionParams,
  CreateServicerParams,
  UpdateServicerParams,
} from "./Servicers.types";

class Servicers extends Api {
  public getServicers = async () => {
    const { data } = await this.api.get<Servicer[]>("/ExternalServicers");
    return data;
  };

  public getServicer = async (servicerId: number) => {
    const { data } = await this.api.get<Servicer>(
      `/ExternalServicers/${servicerId}`
    );
    return data;
  };

  public getServices = async () => {
    const { data } = await this.api.get<Entity[]>("/Services");
    return data;
  };

  public createServicer = async (params: CreateServicerParams) => {
    const { data } = await this.api.post<string>("/ExternalServicers", params);
    return data;
  };

  public updateServicer = async ({ id, ...params }: UpdateServicerParams) => {
    const { data } = await this.api.put<string>(
      `/ExternalServicers/${id}`,
      params
    );
    return data;
  };

  public createServiceExecution = async (
    params: CreateServiceExecutionParams
  ) => {
    const { data } = await this.api.post<string>("/ServiceExecution", params);
    return data;
  };

  public getServicePricings = async (externalServicerId: number) => {
    const { data } = await this.api.get<Entity[]>(
      `/ServicePricing/servicer-pricing/${externalServicerId}`
    );
    return data;
  };

  public getServiceExecutionsByVehicleId = async (vehicleId: number) => {
    const { data } = await this.api.get<ServiceExecution[]>(
      `/ServiceExecution/${vehicleId}`
    );
    return data;
  };

  public finishServiceExecution = async (serviceExecutionId: number) => {
    const { data } = await this.api.put<string>(
      `/ServiceExecution/${serviceExecutionId}/end-execution`
    );
    return data;
  };
}

export default Servicers;
