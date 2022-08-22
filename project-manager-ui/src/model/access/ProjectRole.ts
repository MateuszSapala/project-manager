import {
  translateDeveloper,
  translateProductOwner,
  translateScrumMaster,
  translateViewer
} from "../../service/LanguageService";

export enum ProjectRole {
  PRODUCT_OWNER = "PRODUCT_OWNER",
  SCRUM_MASTER = "SCRUM_MASTER",
  DEVELOPER = "DEVELOPER",
  VIEWER = "VIEWER"
}

export const ProjectRoleTable = [
  ProjectRole.PRODUCT_OWNER,
  ProjectRole.SCRUM_MASTER,
  ProjectRole.DEVELOPER,
  ProjectRole.VIEWER
];

export const projectRoleToString = (role: ProjectRole) => {
  switch (role) {
    case ProjectRole.PRODUCT_OWNER:
      return translateProductOwner();
    case ProjectRole.SCRUM_MASTER:
      return translateScrumMaster();
    case ProjectRole.DEVELOPER:
      return translateDeveloper();
    case ProjectRole.VIEWER:
      return translateViewer();
  }
}