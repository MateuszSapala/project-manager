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
  return state.slice(0, 1) + state.toLowerCase().slice(1)
}
