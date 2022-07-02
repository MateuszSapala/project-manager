export class AddTask {
  end: Date | null;
  name: string;
  description: string;
  assignedToId: number | undefined;
  sprintId: number | undefined;
  projectId: number;

  constructor(projectId: number, name: string, description: string, end: Date | null, assignedToId?: number, sprintId?: number,) {
    this.end = end
    this.name = name
    this.description = description
    this.assignedToId = assignedToId
    this.sprintId = sprintId
    this.projectId = projectId
    return;
  }
}