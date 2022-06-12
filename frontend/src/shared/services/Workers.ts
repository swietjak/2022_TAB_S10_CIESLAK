import { WorkerStatistics } from "shared/types";
import Api from "./Api";

class Workers extends Api {
  public getWorkersStatistics = async () => {
    const { data } = await this.api.get<WorkerStatistics[]>(
      `/Worker/statistics`
    );
    return data;
  };
}

export default Workers;
