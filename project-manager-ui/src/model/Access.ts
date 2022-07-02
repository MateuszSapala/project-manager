import {User} from "./User";
import {Project} from "./Project";
import {ProjectRole} from "./ProjectRole";

export interface Access {
  id: number;
  user: User;
  project: Project;
  projectRole: ProjectRole;
}