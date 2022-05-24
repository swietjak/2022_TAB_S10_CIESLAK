import { paths } from "config";
import { ReservationSummary, UserReservationsTable } from "./pages";
import { CareTakerReservations } from "./pages/CareTakerReservations";

const routes = [
  {
    path: paths.reservationSummary,
    element: () => <ReservationSummary />,
  },
  {
    path: paths.userReservationsTable,
    element: () => <UserReservationsTable />,
  },
  {
    path: paths.careTakerReservationsTable,
    element: () => <CareTakerReservations />,
  },
];

export default routes;
