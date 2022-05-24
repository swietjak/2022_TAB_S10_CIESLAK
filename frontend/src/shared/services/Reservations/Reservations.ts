import { CareTakerReservation, UserReservation } from "shared/types";
import Api from "../Api";
import { CreateUserReservationParams } from "./Reservations.types";

class Reservations extends Api {
  public getUserReservations = async (userId: number) => {
    const { data } = await this.api.get<UserReservation[]>(
      `/Reservation/user-reservations/${userId}`
    );
    return data;
  };

  public getCareTakerReservations = async (careTakerId: number) => {
    const { data } = await this.api.get<CareTakerReservation[]>(
      `/Reservation/user-reservations/${careTakerId}`
    );
    return data;
  };

  public createUserReservation = async (
    params: CreateUserReservationParams
  ) => {
    const { data } = await this.api.post<string>(`/Reservation`, params);
    return data;
  };

  public deleteUserReservation = async (reservationId: number) => {
    const { data } = await this.api.delete<string>(
      `/Reservation/${reservationId}`
    );
    return data;
  };
}

export default Reservations;
