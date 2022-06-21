import {AxiosResponse} from "axios";
import React, {useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import {Task} from "../../model/task/Task";
import {TaskDto} from "../../model/task/TaskDto";
import {TaskState, TaskStateTable} from "../../model/task/TaskState";
import {getTasksByProjectName} from "../../service/TaskService";
import DropWrapper from "./DropWrapper";
import Item from "./Item";

interface Props {
  projectName: string | undefined;
}

const TaskBoard = ({projectName}: Props) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  useEffect(() => {
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
  });

  const onDrop = (task: any, monitor: any, status: TaskState) => {
    setTasks((prevState) => {
      const newItems = prevState.map((i, index) => {
        if (i.id !== task.id || i.taskState === status) {
          return i;
        }
        i.taskState = status;
        //TODO update
        return i;
      });
      return [...newItems];
    });
  };

  return (
    <div className={"row"}>
      {TaskStateTable.map((state) => {
        return (
          <div key={state} className={"col-wrapper"}>
            <h2 className={"col-header"}>{state}</h2>
            <DropWrapper onDrop={onDrop} status={state}>
              <Col>
                {tasks
                  ?.filter((i: Task) => i?.taskState === state)
                  .map((task, idx) => {
                    // console.log(task)
                    return (
                      <Item
                        key={task.id}
                        item={task}
                        index={idx}
                        moveItem={() => {
                        }}
                        status={state}
                      />
                    );
                  })}
              </Col>
            </DropWrapper>
          </div>
        );
      })}
    </div>
  );
};

export default TaskBoard;
