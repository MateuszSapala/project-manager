import {getTasksByProjectName} from "./TaskService";
import {AxiosResponse} from "axios";
import {TaskDto} from "../model/task/TaskDto";
import {Task} from "../model/task/Task";
import {Dispatch, SetStateAction} from "react";
import {Project} from "../model/Project";
import {getProject} from "./ProjectService";
import {Access} from "../model/Access";
import {getAccessByProject} from "./AccessService";


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

export const stateGetAccessesByProject = (projectId: number | undefined, accesses: Array<Access>, setAccesses: Dispatch<SetStateAction<Array<Access>>>) => {
  if (projectId === undefined || accesses.length !== 0) return;
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