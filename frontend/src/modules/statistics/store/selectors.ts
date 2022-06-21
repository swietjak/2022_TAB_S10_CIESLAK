import { RootState } from "app/App.store";

export const getWorkersStatistics = (state: RootState) =>
  state.statistics.getWorkersStatistics;
