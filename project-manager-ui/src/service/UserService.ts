import axios, {AxiosResponse} from "axios";
import AppConfig from "../AppConfig";

export async function getUsers(): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.get(AppConfig.BACKEND_URL + "v1/users", {
    headers: {
      authorization: auth,
    },
  });
}