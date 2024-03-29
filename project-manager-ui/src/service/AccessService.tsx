import axios, {AxiosResponse} from "axios";
import AppConfig from "../config/AppConfig";
import {EditAccess} from "../model/access/EditAccess";

export async function getAccessByProject(projectId: number): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.get(AppConfig.BACKEND_URL + "v1/access?projectId=" + projectId, {
    headers: {
      authorization: auth,
    },
  });
}

export async function editAccess(access: EditAccess): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.patch(AppConfig.BACKEND_URL + "v1/access", access, {
    headers: {
      authorization: auth,
    },
  });
}

export async function deleteAccess(id: number): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.delete(AppConfig.BACKEND_URL + "v1/access/" + id, {
    headers: {
      authorization: auth,
    },
  });
}

export async function getEntitlements(projectId: number): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.get(AppConfig.BACKEND_URL + "v1/access/entitlements/" + projectId, {
    headers: {
      authorization: auth,
    },
  });
}