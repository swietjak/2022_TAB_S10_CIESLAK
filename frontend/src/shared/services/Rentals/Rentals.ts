import { CareTakerReservation, UserReservation } from "shared/types";
import { Rental } from "shared/types";
import Api from "../Api";
import { CreateUserRentalParams } from "./Rentals.types";

class Rentals extends Api {
  public getCareTakerReservations = async (careTakerId: number) => {
    const { data } = await this.api.get<CareTakerReservation[]>(
      `/Rental/user-rentals/${careTakerId}`
    );
    return data;
  };

  public createUserRentals = async (params: CreateUserRentalParams) => {
    const { data } = await this.api.post<string>(`/Rental`, params);
    return data;
  };

  public getCareTakerRentals = async (careTakerId: number) => {
    const { data } = await this.api.get<Rental[]>(
      `/Rental/care-taker-rentals/${careTakerId}`
    );
    return data;
  };
}

export default Rentals;
