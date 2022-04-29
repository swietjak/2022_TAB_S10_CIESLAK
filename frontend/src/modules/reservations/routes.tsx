import { paths } from "config";
import { ReservationSummary, ReservationsTable } from "./pages";

const routes = [
  {
    path: paths.reservationSummary,
    element: () => <ReservationSummary />,
  },
  {
    path: paths.reservationsTable,
    element: () => <ReservationsTable />,
  },
];

export default routes;
