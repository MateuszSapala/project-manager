import axios, {AxiosResponse} from "axios";
import AppConfig from "../config/AppConfig";
import {AddUser} from "../model/user/AddUser";
import {EditUser} from "../model/user/EditUser";

export async function getUsers(): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.get(AppConfig.BACKEND_URL + "v1/users", {
    headers: {
      authorization: auth,
    },
  });
}

export async function addUser(user: AddUser): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.post(AppConfig.BACKEND_URL + "v1/users", user, {
    headers: {
      authorization: auth,
    },
  });
}

export async function editUser(id: number, user: EditUser): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.patch(AppConfig.BACKEND_URL + "v1/users/" + id, user, {
    headers: {
      authorization: auth,
    },
  });
}