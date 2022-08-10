import axios, {AxiosResponse} from "axios";
import AppConfig from "../config/AppConfig";
import {EditTask} from "../model/task/EditTask";
import {AddTask} from "../model/task/AddTask";

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

export async function addTask(task: AddTask): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.post(AppConfig.BACKEND_URL + "v1/task", task, {
    headers: {
      authorization: auth,
    },
  });
}