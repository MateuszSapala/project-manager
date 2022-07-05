import {Project} from "../Project";

export interface SprintDto {
  id: number;
  name: string;
  start: number[];
  end: number[];
  project: Project;
  closed: boolean;
}