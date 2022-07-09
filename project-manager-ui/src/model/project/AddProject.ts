export interface AddProject {
  name: string;
  description: string;
}

export class AddProject {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    return;
  }
}