import axios, {AxiosResponse} from "axios";
import AppConfig from "../config/AppConfig";
import {AddSprintDto} from "../model/sprint/AddSprintDto";

export async function getSprintsByProjectId(projectId: number): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.get(AppConfig.BACKEND_URL + "v1/sprints/project/" + projectId, {
    headers: {
      authorization: auth,
    },
  });
}

export async function getActiveSprintByProjectId(projectId: number): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.get(AppConfig.BACKEND_URL + "v1/sprints/project/" + projectId + "/active", {
    headers: {
      authorization: auth,
    },
  });
}

export async function closeSprint(id: number): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.post(AppConfig.BACKEND_URL + "v1/sprints/" + id + "/close", undefined, {
    headers: {
      authorization: auth,
    },
  });
}

export async function addSprint(sprint: AddSprintDto): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.post(AppConfig.BACKEND_URL + "v1/sprints", sprint, {
    headers: {
      authorization: auth,
    },
  });
}