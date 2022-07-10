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
}

const TaskBoard = ({projectName}: Props) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [activeSprint, setActiveSprint] = useState<Sprint | null>(null);
  // const [sprints, setSprints] = useState<Array<Sprint>>([]);
  // const [sprint, setSprint] = useState<Sprint | null>(null);

  useEffect(() => {
    stateGetTasks(projectName, tasks, setTasks);
    stateGetProject(projectName, project, setProject);
    // stateGetSprintsByProject(project?.id, sprints, setSprints);
    stateGetActiveSprintByProject(project?.id, activeSprint, setActiveSprint)
  }, [activeSprint, project, projectName, /*sprints,*/ tasks]);

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

  // const displaySprintSelect = () => {
  //   return (
  //     <label htmlFor="sprint">
  //       Board for sprint:
  //       <select className="form-control text-primary" id="sprint"
  //               value={sprint !== null ? sprint.id : activeSprint?.id}
  //               onChange={event => setSprint(sprints.filter(s => s.id.toString() === event.target.value)[0])}>
  //         <option value={undefined} disabled={true}>No sprint selected</option>
  //         {sprints.map(sprint => {
  //           return (<option className="text-primary" value={sprint.id} key={sprint.id}>
  //             {sprint.name}
  //           </option>)
  //         })}
  //       </select>
  //     </label>
  //   )
  // }

  return (
    <div>
      {/*{displaySprintSelect()}*/}
      <div className={"row"}>
        {TaskStateTable.map((state) => {
          return (
            <div key={state} className={"col-wrapper"}>
              <h2 className={"col-header"}>{state}</h2>
              <DropWrapper onDrop={onDrop} status={state}>
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
