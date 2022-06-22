import {TaskState} from "./TaskState";

export class EditTask {
  name: string | undefined;
  description: string | undefined;
  end: string | undefined;
  assignedToId: number | undefined;
  sprintId: number | undefined;
  taskState: TaskState | undefined;

  constructor(name?: string, description?: string, end?: string, assignedToId?: number, sprintId?: number, taskState?: TaskState) {
    this.name = name
    this.description = description
    this.end = end
    this.assignedToId = assignedToId
    this.sprintId = sprintId
    this.taskState = taskState
    return;
  }
}