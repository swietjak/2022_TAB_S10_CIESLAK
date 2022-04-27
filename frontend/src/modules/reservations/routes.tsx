import { paths } from "config";
import ReservationsTable from "./pages/ReservationsTable";

const routes = [
  {
    path: paths.reservationSummary,
    element: () => <div>test</div>,
  },
  {
    path: paths.reservationsTable,
    element: () => <ReservationsTable />,
  },
];

export default routes;
