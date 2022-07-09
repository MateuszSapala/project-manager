import {getTasksByProjectName} from "./TaskService";
import {AxiosResponse} from "axios";
import {TaskDto} from "../model/task/TaskDto";
import {Task} from "../model/task/Task";
import {Dispatch, SetStateAction} from "react";
import {Project} from "../model/project/Project";
import {getProject} from "./ProjectService";
import {Access} from "../model/access/Access";
import {getAccessByProject} from "./AccessService";
import {Sprint} from "../model/sprint/Sprint";
import {getActiveSprintByProjectId, getSprintsByProjectId} from "./SprintService";
import {SprintDto} from "../model/sprint/SprintDto";
import {User} from "../model/User";
import {getUsers} from "./UserService";


export const stateGetTasks = (projectName: string | undefined, tasks: Array<Task>, setTasks: Dispatch<SetStateAction<Task[]>>) => {
  if (tasks.length !== 0 || projectName === undefined) return;
  getTasksByProjectName(projectName).then((response) => {
    const resp = response as AxiosResponse;
    if (resp.status !== 200) {
      console.log("Unable to load task list for project: projectName=" + projectName);
      return;
    }
    const taskDtoList: Array<TaskDto> = resp.data;
    const taskList: Array<Task> = taskDtoList.map((item) => new Task(item));
    console.log({tasks: taskList});
    setTasks(taskList);
  });
}

export const stateGetProject = (projectName: string | undefined, project: Project | null, setProject: Dispatch<SetStateAction<Project | null>>) => {
  if (projectName === undefined || project !== null) return;
  getProject(projectName!).then((response) => {
    const resp = response as AxiosResponse;
    if (resp.status !== 200) {
      console.log("Unable to load project: projectName=" + projectName);
      return;
    }
    const project: Project = resp.data;
    console.log({project: project});
    setProject(project);
  });
}

export const stateGetAccessesByProject = (projectId: number | undefined, accesses: Array<Access> | null, setAccesses: Dispatch<SetStateAction<Array<Access> | null>>) => {
  if (projectId === undefined || accesses !== null) return;
  getAccessByProject(projectId!).then((response) => {
    const resp = response as AxiosResponse;
    if (resp.status !== 200) {
      console.log("Unable to load accesses: projectId=" + projectId);
      return;
    }
    const accesses: Array<Access> = resp.data;
    console.log({accesses: accesses});
    setAccesses(accesses);
  });
}

export const stateGetSprintsByProject = (projectId: number | undefined, sprints: Array<Sprint> | null, setSprints: Dispatch<SetStateAction<Array<Sprint> | null>>) => {
  if (projectId === undefined || sprints !== null) return;
  getSprintsByProjectId(projectId!).then((response) => {
    const resp = response as AxiosResponse;
    if (resp.status !== 200) {
      console.log("Unable to load sprints: projectId=" + projectId);
      return;
    }
    const sprints: Array<Sprint> = resp.data.map((dto: SprintDto) => new Sprint(dto))
    console.log({sprints: sprints});
    setSprints(sprints);
  });
}

export const stateGetActiveSprintByProject = (projectId: number | undefined, sprint: Sprint | null, setSprint: Dispatch<SetStateAction<Sprint | null>>) => {
  if (projectId === undefined || sprint !== null) return;
  getActiveSprintByProjectId(projectId!).then((response) => {
    const resp = response as AxiosResponse;
    if (resp.status !== 200) {
      console.log("Unable to load active sprint: projectId=" + projectId);
      return;
    }
    const sprint: Sprint = new Sprint(resp.data);
    console.log({activeSprint: sprint});
    setSprint(sprint);
  });
}

export const stateGetUsers = (users: Array<User> | null, setUsers: Dispatch<SetStateAction<Array<User> | null>>) => {
  if (users !== null) return;
  getUsers().then((response) => {
    const resp = response as AxiosResponse;
    if (resp.status !== 200) {
      console.log("Unable to load users");
      return;
    }
    const users: Array<User> = resp.data;
    console.log({users: users});
    setUsers(users);
  });
}