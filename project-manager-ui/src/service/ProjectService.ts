import axios, {AxiosResponse} from "axios";
import AppConfig from "../AppConfig";

export async function getProjects(): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;

  return axios.get(AppConfig.BACKEND_URL + "v1/projects", {
    headers: {
      authorization: auth,
    },
  });
}
