import { ReservationArchive } from "shared/types";
import Api from "../Api";
import { CreateVehicleReturnParams } from "./VehicleReturns.types";

class VehicleReturns extends Api {
  public createVehicleReturn = async (params: CreateVehicleReturnParams) => {
    const { data } = await this.api.post<string>(`/VehicleReturn`, params);
    return data;
  };

  public getReservationArchive = async (workerId: number) => {
    const { data } = await this.api.get<ReservationArchive[]>(
      `/VehicleReturn/care-taker-archive/${workerId}`
    );
    return data;
  };
}

export default VehicleReturns;
