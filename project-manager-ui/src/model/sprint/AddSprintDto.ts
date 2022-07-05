export class AddSprintDto {
  name: string;
  start: Date;
  end: Date;
  projectId: number;

  constructor(name: string, start: Date, end: Date, projectId: number) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.projectId = projectId;
    return;
  }
}