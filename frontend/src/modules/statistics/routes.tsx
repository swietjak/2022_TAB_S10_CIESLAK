import { paths } from "config";
import { WorkerStatisticsTable } from "./pages";

const routes = [
  {
    path: paths.workersStatistics,
    element: () => <WorkerStatisticsTable />,
  },
];

export default routes;
