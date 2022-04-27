import axios, { AxiosInstance } from "axios";

class Api {
  protected api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });
}

export default Api;
