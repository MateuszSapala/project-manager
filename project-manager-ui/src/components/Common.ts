import {getTasksByProjectName} from "../service/TaskService";
import {AxiosResponse} from "axios";
import {TaskDto} from "../model/task/TaskDto";
import {Task} from "../model/task/Task";
import {Dispatch, SetStateAction} from "react";


export const getTasks = (projectName: string | undefined, tasks: Array<Task>, setTasks: Dispatch<SetStateAction<Task[]>>) => {
  if (tasks.length !== 0 || projectName === undefined) return;
  getTasksByProjectName(projectName).then((response) => {
    const resp = response as AxiosResponse;
    if (resp.status !== 200) {
      console.log("Unable to load task list for project " + projectName);
      return;
    }
    const taskDtoList: Array<TaskDto> = resp.data;
    const taskList: Array<Task> = taskDtoList.map((item) => new Task(item));
    console.log({tasks: taskList});
    setTasks(taskList);
  });
}