import axios, {AxiosResponse} from "axios";
import AppConfig from "../AppConfig";
import {EditTask} from "../model/task/EditTask";

export async function getTasksByProjectName(projectName: string): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.get(AppConfig.BACKEND_URL + "v1/task/project/" + projectName, {
    headers: {
      authorization: auth,
    },
  });
}

export async function editTask(id: number, task: EditTask): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.patch(AppConfig.BACKEND_URL + "v1/task/" + id, task, {
    headers: {
      authorization: auth,
    },
  });
}