import {User} from "../user/User";
import {Project} from "../project/Project";
import {ProjectRole} from "./ProjectRole";

export interface Access {
  id: number;
  user: User;
  project: Project;
  projectRole: ProjectRole;
}