import {translateDoing, translateDone, translateReviewed, translateTodo} from "../../service/LanguageService";

export enum TaskState {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
  REVIEWED = "REVIEWED",
}

export const TaskStateTable = [
  TaskState.TODO,
  TaskState.DOING,
  TaskState.DONE,
  TaskState.REVIEWED,
];

export const capitalizedStatus = (state: TaskState) => {
  switch (state) {
    case TaskState.TODO:
      return translateTodo();
    case TaskState.DOING:
      return translateDoing();
    case TaskState.DONE:
      return translateDone();
    case TaskState.REVIEWED:
      return translateReviewed();
  }
}
