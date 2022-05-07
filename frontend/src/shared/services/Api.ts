import axios, { AxiosInstance } from "axios";

class Api {
  protected api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: false,
  });
}

export default Api;
