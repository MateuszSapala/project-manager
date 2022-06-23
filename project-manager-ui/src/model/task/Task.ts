import {Project} from "../Project";
import {User} from "../User";
import {TaskDto} from "./TaskDto";
import {TaskState} from "./TaskState";

export class Task {
  id: number;
  name: string;
  description: string;
  created: Date | null;
  createdBy: User;
  end: Date | null;
  assignedTo?: User;
  taskState: TaskState;
  project: Project;
  sprint?: any;

  constructor(taskDto: TaskDto) {
    this.id = taskDto.id;
    this.name = taskDto.name;
    this.description = taskDto.description;
    const c = taskDto.created;
    this.created = c !== null ? new Date(c[0], c[1], c[2], c[3], c[4], c[5]) : null;
    this.createdBy = taskDto.createdBy;
    const e = taskDto.end;
    this.end = e !== null ? new Date(e[0], e[1], e[2], e[3], e[4], e[5]) : null;
    this.assignedTo = taskDto.assignedTo;
    this.taskState = taskDto.taskState;
    this.project = taskDto.project;
    this.sprint = taskDto.sprint;
    return;
  }
}