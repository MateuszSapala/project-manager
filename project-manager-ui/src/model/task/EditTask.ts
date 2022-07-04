import {TaskState} from "./TaskState";

export class EditTask {
  end: Date | null;
  name: string | undefined;
  description: string | undefined;
  assignedToId: number | undefined;
  sprintId: number | undefined;
  taskState: TaskState | undefined;
  editedFields: Array<string>

  constructor(editedFields: Array<string>, end: Date | null, name?: string, description?: string, assignedToId?: number, sprintId?: number, taskState?: TaskState) {
    this.editedFields = editedFields
    this.end = end
    this.name = name
    this.description = description
    this.assignedToId = assignedToId
    this.sprintId = sprintId
    this.taskState = taskState
    return;
  }
}