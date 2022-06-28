import {useParams} from "react-router-dom";
import "../App.css";
import {Project} from "../model/Project";
import {User} from "../model/User";
import Sidebar from "./Sidebar";
import {Accordion} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Task} from "../model/task/Task";
import {getTasks} from "./Common";
import {capitalizedStatus, TaskState, TaskStateTable} from "../model/task/TaskState";

interface Props {
  loggedUser: User;
  projects: Array<Project>;
}

function Backlog({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [isStateChecked, setIsStateChecked] = useState(TaskStateTable);

  useEffect(() => {
    getTasks(projectName, tasks, setTasks);
  }, [projectName, tasks]);

  const displayCheckbox = (state: TaskState) => {
    const checked = isStateChecked.includes(state);
    return (
      <div className="checkbox-backlog">
        <input type="checkbox" checked={checked} onChange={() => {
          setIsStateChecked(checked ? isStateChecked.filter(x => x !== state) : [...isStateChecked, state])
        }}/>{" " + capitalizedStatus(state)}
      </div>
    )
  }

  const displayTask = (task: Task) => {
    return (
      <Accordion defaultActiveKey="1" className="accordion-task" key={task.id}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <p style={{fontSize: "large"}}>
              {task.name}
              <span className="accordion-task-right">
                <span
                  style={{marginRight: "30px"}}>{task.assignedTo ? task.assignedTo.name + " " + task.assignedTo.surname : "Unsigned"}
                </span>
                &#x290B; &#x290A;
              </span>
            </p>
          </Accordion.Header>
          <Accordion.Body>
            <p>Description:</p>
            <p>{task.description}</p>
            <br/>
            <p>State: {capitalizedStatus(task.taskState)}</p>
            <p>Created on: {task.created?.toDateString()}</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    )
  }

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} selectedProject={projectName}/>
        <div className="main-content">
          <h1>Backlog {projectName}</h1>
          {TaskStateTable.map(state => displayCheckbox(state))}
          {tasks.filter(task => isStateChecked.includes(task.taskState)).map(task => displayTask(task))}
        </div>
      </div>
    </div>
  );
}

export default Backlog;
