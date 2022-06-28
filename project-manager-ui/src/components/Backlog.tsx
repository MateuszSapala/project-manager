import {useParams} from "react-router-dom";
import "../App.css";
import {Project} from "../model/Project";
import {User} from "../model/User";
import Sidebar from "./Sidebar";
import {Accordion} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Task} from "../model/task/Task";
import {stateGetAccessesByProject, stateGetProject, stateGetTasks} from "../service/UseStateService";
import {capitalizedStatus, TaskState, TaskStateTable} from "../model/task/TaskState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Access} from "../model/Access";
import {addTask} from "../service/TaskService";
import {AxiosResponse} from "axios";
import {AddTask} from "../model/task/AddTask";

interface Props {
  loggedUser: User;
  projects: Array<Project>;
}

function Backlog({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [accesses, setAccesses] = useState<Array<Access>>([]);
  const [isStateChecked, setIsStateChecked] = useState(TaskStateTable);

  const [taskDate, setTaskDate] = useState<Date | null>(null);
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskAssignedUser, setTaskAssignedUser] = useState<User | undefined>(undefined);
  const [taskError, setTaskError] = useState<string>("");
  const [taskSuccess, setTaskSuccess] = useState<string>("");

  useEffect(() => {
    stateGetProject(projectName, project, setProject);
    stateGetTasks(projectName, tasks, setTasks);
    stateGetAccessesByProject(project?.id, accesses, setAccesses);
  }, [accesses, project, projectName, tasks]);

  const displayCheckbox = (state: TaskState) => {
    const checked = isStateChecked.includes(state);
    return (
      <div className="checkbox-backlog" key={state}>
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

  const displayAdd = () => {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="taskName">
            Task name:
            <input type="email" className="form-control text-primary" placeholder="Enter task name" id="taskName"
                   value={taskName}
                   onChange={(event => setTaskName(event.target.value))}/>
          </label>
          <label htmlFor="taskDescription">
            Description:
            <textarea className="form-control text-primary" placeholder="Enter description" id="taskDescription"
                      value={taskDescription}
                      onChange={(event => setTaskDescription(event.target.value))}/>
          </label>
          <label htmlFor="taskEnd">
            End date:
            <DatePicker onChange={date => setTaskDate(date)} selected={taskDate} className="form-control text-primary"
                        placeholderText={"Enter end date"} id="taskEnd" dateFormat='dd-MM-yyyy'/>
          </label>
          {displayUserSelect(accesses)}
          {displayMessages()}
          <button className="btn btn-primary btn-block" onClick={handleAddTask}>Add</button>
        </div>
      </div>
    )
  }

  const displayMessages = () => {
    return (<div>
      {taskError === "" ? "" : <div className="alert alert-danger" role="alert">
        {taskError}
      </div>}
      {taskSuccess === "" ? "" : <div className="alert alert-primary" role="alert">
        {taskSuccess}
      </div>}
    </div>)
  }

  const handleAddTask = () => {
    setTaskError("");
    setTaskSuccess("");
    const missing: Array<string> = [];
    if (taskName === "") missing.push("name");
    if (taskDescription === "") missing.push("description")
    if (missing.length > 0) {
      setTaskError("The following data is missing: " + missing);
      return;
    }
    console.log(new AddTask(project!.id, taskName, taskDescription, taskDate, taskAssignedUser?.id, undefined))
    addTask(new AddTask(project!.id, taskName, taskDescription, taskDate, taskAssignedUser?.id, undefined)).then(response => {
      if ((response as AxiosResponse).status !== 201) {
        console.log("dassssssss")
        setTaskError("Unable to add task")
        return;
      }
      setTasks([...tasks, new Task(response.data)]);
      setTaskSuccess("Successfully added task");
      return;
    }).catch(e => console.error(e));
  }

  const displayUserSelect = (accesses: Array<Access>) => {
    return (
      <label htmlFor="taskUser">
        Assigned user:
        <select className="form-control text-primary" id="taskUser" value={taskAssignedUser?.id}
                onChange={event => setTaskAssignedUser(accesses.find(access => access.user.id.toString() === event.target.value)?.user)}>
          <option value={undefined}></option>
          {accesses.map(access => {
            return (<option className="text-primary" value={access.user.id} key={access.user.id}>
              {access.user.name + " " + access.user.surname}
            </option>)
          })}
        </select>
      </label>
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
          {displayAdd()}
        </div>
      </div>
    </div>
  );
}

export default Backlog;
