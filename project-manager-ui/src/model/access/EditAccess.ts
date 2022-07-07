import {ProjectRole} from "./ProjectRole";

export class EditAccess {
  userId: number;
  projectId: number;
  projectRole: ProjectRole;

  constructor(userId: number, projectId: number, projectRole: ProjectRole) {
    this.userId = userId
    this.projectId = projectId
    this.projectRole = projectRole
    return;
  }
}