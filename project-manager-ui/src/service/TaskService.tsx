import axios, {AxiosResponse} from "axios";
import AppConfig from "../AppConfig";

export async function getTasksByProjectName(
  projectName: string
): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.get(AppConfig.BACKEND_URL + "v1/task/project/" + projectName, {
    headers: {
      authorization: auth,
    },
  });
}
