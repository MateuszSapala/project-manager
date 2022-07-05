import {Project} from "./Project";
import {SprintDto} from "./SprintDto";

export class Sprint {
  id: number;
  name: string;
  start: Date | null;
  end: Date | null;
  project: Project;

  constructor(sprintDto: SprintDto) {
    this.id = sprintDto.id;
    this.name = sprintDto.name;
    const s = sprintDto.start;
    this.start = s !== null ? new Date(s[0], s[1], s[2]) : null;
    const e = sprintDto.end;
    this.end = e !== null ? new Date(e[0], e[1], e[2]) : null;
    this.project = sprintDto.project;
    return;
  }
}