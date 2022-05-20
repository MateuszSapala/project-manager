import axios, { AxiosResponse } from "axios";
import AppConfig from "../AppConfig";
import Credentials from "../model/Credentials";

export async function sendLogin(
  credentials: Credentials
): Promise<AxiosResponse> {
  return axios.post(AppConfig.BACKEND_URL + "v1/login", credentials);
}

export async function sendVerify(auth: string): Promise<AxiosResponse> {
  return axios.get(AppConfig.BACKEND_URL + "v1/verify", {
    headers: {
      authorization: auth,
    },
  });
}
