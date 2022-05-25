import { CareTakerReservation, UserReservation } from "shared/types";
import Api from "../Api";
import { CreateUserRentalParams } from "./Rentals.types";

class Rentals extends Api {
  public getCareTakerReservations = async (careTakerId: number) => {
    const { data } = await this.api.get<CareTakerReservation[]>(
      `/Rentals/user-rentals/${careTakerId}`
    );
    return data;
  };

  public createUserRentals = async (params: CreateUserRentalParams) => {
    const { data } = await this.api.post<string>(`/Rentals`, params);
    return data;
  };
}

export default Rentals;
