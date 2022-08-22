import axios, {AxiosResponse} from "axios";
import AppConfig from "../config/AppConfig";
import {AddRetroNote} from "../model/retro/AddRetroNote";

export async function getRetroNotesBySprintId(sprintId: number): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.get(AppConfig.BACKEND_URL + "v1/retro-note/sprint/" + sprintId, {
    headers: {
      authorization: auth,
    },
  });
}

export async function addRetroNote(note: AddRetroNote): Promise<AxiosResponse> {
  const auth: string = window.localStorage.getItem("authorization")!;
  return axios.post(AppConfig.BACKEND_URL + "v1/retro-note", note, {
    headers: {
      authorization: auth,
    },
  });
}