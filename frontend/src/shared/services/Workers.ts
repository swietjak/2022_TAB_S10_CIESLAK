import { Entity, WorkerStatistics } from "shared/types";
import Api from "./Api";

class Workers extends Api {
  public getWorkersStatistics = async () => {
    const { data } = await this.api.get<WorkerStatistics[]>(
      `/Worker/statistics`
    );
    return data;
  };

  public getCareTakers = async () => {
    const { data } = await this.api.get<Entity[]>(`/Worker/care-takers`);
    return data;
  };
}

export default Workers;
