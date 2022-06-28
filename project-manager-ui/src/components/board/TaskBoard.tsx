import React, {useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import {Task} from "../../model/task/Task";
import {TaskState, TaskStateTable} from "../../model/task/TaskState";
import {editTask} from "../../service/TaskService";
import DropWrapper from "./DropWrapper";
import Item from "./Item";
import {EditTask} from "../../model/task/EditTask";
import {getTasks} from "../Common";

interface Props {
  projectName: string | undefined;
}

const TaskBoard = ({projectName}: Props) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  useEffect(() => {
    getTasks(projectName, tasks, setTasks);
  }, [projectName, tasks]);

  const onDrop = (task: Task, monitor: any, status: TaskState) => {
    setTasks((prevState) => {
      const newItems = prevState.map((i, index) => {
        if (i.id !== task.id || i.taskState === status) {
          return i;
        }
        editTask(i.id, new EditTask(undefined, undefined, undefined, undefined, undefined, status))
          .catch(error => {
            console.error(error);
            alert("Unable to update " + task.name);
            setTasks([...tasks.filter(x => x.id !== task.id), task]);
          });
        i.taskState = status;
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
