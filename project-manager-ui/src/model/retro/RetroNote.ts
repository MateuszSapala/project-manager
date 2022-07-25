import {Sprint} from "../sprint/Sprint";

export interface RetroNote {
  id: number;
  note: string;
  noteType: string;
  sprint: Sprint;
}