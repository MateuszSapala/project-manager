import {getTasksByProjectName} from "./TaskService";
import {AxiosResponse} from "axios";
import {TaskDto} from "../model/task/TaskDto";
import {Task} from "../model/task/Task";
import {Dispatch, SetStateAction} from "react";
import {Project} from "../model/project/Project";
import {getProject} from "./ProjectService";
import {Access} from "../model/access/Access";
import {getAccessByProject, getEntitlements} from "./AccessService";
import {Sprint} from "../model/sprint/Sprint";
import {getActiveSprintByProjectId, getSprintsByProjectId} from "./SprintService";
import {SprintDto} from "../model/sprint/SprintDto";
import {User} from "../model/user/User";
import {getUsers} from "./UserService";
import {Entitlements} from "../model/access/Entitlements";
import {RetroNote} from "../model/retro/RetroNote";
import {getRetroNotesBySprintId} from "./RetroService";


export const stateGetTasks = (projectName: string | undefined, tasks: Array<Task> | null, setTasks: Dispatch<SetStateAction<Task[] | null>>) => {
  if (tasks !== null || projectName === undefined) return;
  getTasksByProjectName(projectName).then((response) => {
    const resp = response as AxiosResponse;
    if (resp.status !== 200) {
      console.log("Unable to load task list for project: projectName=" + projectName);
      return;
    }
    const taskList: Array<Task> = resp.data.map((item: TaskDto) => new Task(item));
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

export const stateGetEntitlements = (projectId: number | undefined, entitlements: Entitlements | undefined, setEntitlements: Dispatch<SetStateAction<Entitlements | undefined>>) => {
  if (projectId === undefined || entitlements !== undefined) return;
  getEntitlements(projectId!).then((response) => {
    const resp = response as AxiosResponse;
    if (resp.status !== 200) {
      console.log("Unable to load entitlements: projectId=" + projectId);
      return;
    }
    console.log({entitlements: resp.data});
    setEntitlements(resp.data);
  });
}

export const stateGetRetroNotesBySprintId = (sprintId: number, setRetroNotes: Dispatch<SetStateAction<RetroNote[] | null>>) => {
  getRetroNotesBySprintId(sprintId).then((response) => {
    const resp = response as AxiosResponse;
    if (resp.status !== 200) {
      console.log("Unable to load retro notes: sprintId=" + sprintId);
      return;
    }
    const notes: RetroNote[] = resp.data;
    console.log({retroNotes: notes});
    setRetroNotes(notes);
  });
}