import React, {useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import {Task} from "../../model/task/Task";
import {TaskState, TaskStateTable} from "../../model/task/TaskState";
import {editTask} from "../../service/TaskService";
import DropWrapper from "./DropWrapper";
import Item from "./Item";
import {EditTask} from "../../model/task/EditTask";
import {stateGetActiveSprintByProject, stateGetProject, stateGetTasks} from "../../service/UseStateService";
import {Project} from "../../model/project/Project";
import {Sprint} from "../../model/sprint/Sprint";

interface Props {
  projectName: string | undefined;
  canEdit: boolean;
}

const TaskBoard = ({projectName, canEdit}: Props) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [activeSprint, setActiveSprint] = useState<Sprint | null>(null);

  useEffect(() => {
    stateGetTasks(projectName, tasks, setTasks);
    stateGetProject(projectName, project, setProject);
    stateGetActiveSprintByProject(project?.id, activeSprint, setActiveSprint)
  }, [activeSprint, project, projectName, tasks]);

  const onDrop = (task: Task, monitor: any, status: TaskState) => {
    setTasks((prevState) => {
      const newItems = prevState.map((i, index) => {
        if (i.id !== task.id || i.taskState === status) {
          return i;
        }
        editTask(i.id, new EditTask(["taskState"], null, undefined, undefined, undefined, undefined, status))
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

  const onDropDisabled = (task: Task, monitor: any, status: TaskState) => {
    alert("Not enough rights to edit task");
  };

  return (
    <div>
      <div className={"row"}>
        {TaskStateTable.map((state) => {
          return (
            <div key={state} className={"col-wrapper"}>
              <h2 className={"col-header"}>{state}</h2>
              <DropWrapper onDrop={canEdit ? onDrop : onDropDisabled} status={state}>
                <Col>
                  {tasks
                    ?.filter((i: Task) => i?.taskState === state && activeSprint !== null && i.sprint?.id === (/*sprint !== null ? sprint.id : */activeSprint?.id))
                    .map((task, idx) => {
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
    </div>
  );
};

export default TaskBoard;
