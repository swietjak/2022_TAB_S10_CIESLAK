import { reservationsMock } from "shared/mocks";
import Api from "../Api";

class Reservations extends Api {
  public getUserReservations = async () => {
    const { data } = await new Promise((resolve) => {
      setTimeout(() => resolve({ data: reservationsMock }), 5000);
    });
    return data;
  };
}

export default Reservations;
