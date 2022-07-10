import {Project} from "../project/Project";
import {User} from "../user/User";
import {TaskState} from "./TaskState";

export interface TaskDto {
  id: number;
  name: string;
  description: string;
  created: number[];
  createdBy: User;
  end: number[];
  assignedTo?: any;
  taskState: TaskState;
  project: Project;
  sprint?: any;
}
