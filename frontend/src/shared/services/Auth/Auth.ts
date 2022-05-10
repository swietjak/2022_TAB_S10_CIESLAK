import Api from "../Api";
import { LoginParams, LoginResponse } from "./Auth.types";

class Auth extends Api {
  public login = async (params: LoginParams) => {
    const { data } = await this.api.post<LoginResponse>("/Login", params);
    return data;
  };
}
export default Auth;
