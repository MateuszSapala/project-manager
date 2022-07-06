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
  return role?.replace("_", " ")?.toLowerCase();
}