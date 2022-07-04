import {useParams} from "react-router-dom";
import "../App.css";
import {Project} from "../model/Project";
import {User} from "../model/User";
import Sidebar from "./Sidebar";
import {Accordion} from "react-bootstrap";
import {Dispatch, useEffect, useState} from "react";
import {Task} from "../model/task/Task";
import {stateGetAccessesByProject, stateGetProject, stateGetTasks} from "../service/UseStateService";
import {capitalizedStatus, TaskState, TaskStateTable} from "../model/task/TaskState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Access} from "../model/Access";
import {addTask, editTask} from "../service/TaskService";
import {AxiosResponse} from "axios";
import {AddTask} from "../model/task/AddTask";
import {EditTask} from "../model/task/EditTask";

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

  const [editedTaskId, setEditedTaskId] = useState<number | null>(null);
  const [editedTaskDate, setEditedTaskDate] = useState<Date | null>(null);
  const [editedTaskName, setEditedTaskName] = useState<string>("");
  const [editedTaskDescription, setEditedTaskDescription] = useState<string>("");
  const [editedTaskAssignedUser, setEditedTaskAssignedUser] = useState<User | undefined>(undefined);
  const [editedTaskError, setEditedTaskError] = useState<string>("");

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

  const displayTask = (task: Task, disabled: boolean, setEditedTaskId: Dispatch<number | null>) => {
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
            {displayEdit(disabled, task)}
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
          {displayUserSelect(false, accesses, taskAssignedUser, setTaskAssignedUser)}
          {displayMessages(taskError, taskSuccess)}
          <button className="btn btn-primary btn-block" onClick={handleAddTask}>Add</button>
        </div>
      </div>
    )
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
    addTask(new AddTask(project!.id, taskName, taskDescription, taskDate, taskAssignedUser?.id, undefined)).then(response => {
      if ((response as AxiosResponse).status !== 201) {
        setTaskError("Unable to add task")
        return;
      }
      setTasks([...tasks, new Task(response.data)]);
      setTaskSuccess("Successfully added task");
      return;
    });
  }

  const displayEdit = (disabled: boolean, task: Task) => {
    return (
      <div className="form-group">
        {disabled ? "" :
          <label htmlFor="taskName">
            Task name:
            <input type="text" className="form-control text-primary" placeholder={task.name} id="taskName"
                   value={disabled ? "" : editedTaskName} disabled={disabled}
                   onChange={(event => setEditedTaskName(event.target.value))}/>
          </label>}
        <label htmlFor="taskDescription">
          Description:
          <textarea className="form-control text-primary" placeholder={task.description} id="taskDescription"
                    value={disabled ? "" : editedTaskDescription} disabled={disabled}
                    onChange={(event => setEditedTaskDescription(event.target.value))}/>
        </label>
        <label htmlFor="taskEnd">
          End date:
          <DatePicker onChange={date => setEditedTaskDate(date)} selected={disabled ? task.end : editedTaskDate}
                      className={disabled ? "form-control" : "form-control text-primary"} disabled={disabled}
                      placeholderText={"Enter end date"} id="taskEnd" dateFormat='dd-MM-yyyy'/>
        </label>
        {displayUserSelect(disabled, accesses, disabled ? task.assignedTo : editedTaskAssignedUser, setEditedTaskAssignedUser)}
        {displayMessages(editedTaskError)}
        {disabled ? <button className="btn btn-primary btn-block"
                            onClick={() => editTaskChangeState(task)}>Edit</button> : ""}
        {!disabled ?
          <div className="two-buttons-container">
            <div className="two-buttons float-left">
              <button className="btn btn-primary btn-block" onClick={handleSaveTask}>
                Save
              </button>
            </div>
            <div className="two-buttons float-right">
              <button className="btn btn-primary btn-block" onClick={() => editTaskChangeState()}>
                Cancel
              </button>
            </div>
          </div>
          : ""}
      </div>
    )
  }

  const displayMessages = (error: string, success?: string) => {
    return (<div>
      {error === "" ? "" : <div className="alert alert-danger" role="alert">
        {error}
      </div>}
      {success === "" || success === undefined ? "" : <div className="alert alert-primary" role="alert">
        {success}
      </div>}
    </div>)
  }

  const editTaskChangeState = (task?: Task) => {
    setEditedTaskId(task !== undefined ? task.id : null);
    setEditedTaskDate(task !== undefined ? task.end : null);
    setEditedTaskName(task !== undefined ? task.name : "");
    setEditedTaskDescription(task !== undefined ? task.description : "");
    setEditedTaskAssignedUser(task !== undefined ? task.assignedTo : undefined);
    setEditedTaskError("");
  }

  const handleSaveTask = () => {
    setEditedTaskError("");
    const missing: Array<string> = [];
    if (editedTaskName === "") missing.push("name");
    if (editedTaskDescription === "") missing.push("description")
    if (missing.length > 0) {
      setEditedTaskError("The following data is missing: " + missing);
      return;
    }
    editTask(editedTaskId!, new EditTask(["end", "name", "description", "assignedToId"], editedTaskDate, editedTaskName, editedTaskDescription, editedTaskAssignedUser?.id, undefined, undefined)).then(response => {
      console.log(response);
      if ((response as AxiosResponse).status !== 201) {
        setEditedTaskError("Unable to edit task")
        return;
      }
      setTasks([...(tasks.filter(t => t.id !== editedTaskId!)), new Task(response.data)]);
      editTaskChangeState();
      return;
    });
  }

  const displayUserSelect = (disabled: boolean, accesses: Array<Access>, user: User | undefined, setUser?: Dispatch<User | undefined>) => {
    return (
      <label htmlFor="taskUser">
        Assigned user:
        <select className={disabled || user === undefined ? "form-control" : "form-control text-primary"} id="taskUser"
                value={user?.id} disabled={disabled}
                onChange={event => setUser ? setUser(accesses.find(access => access.user.id.toString() === event.target.value)?.user) : {}}>
          <option value={undefined} disabled={disabled}>Add assigned user</option>
          {accesses.map(access => {
            return (<option className="text-primary" value={access.user.id} key={access.user.id}
                            disabled={disabled}>
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
          {tasks.filter(task => isStateChecked.includes(task.taskState)).map(task => displayTask(task, task.id !== editedTaskId, setEditedTaskId))}
          {displayAdd()}
        </div>
      </div>
    </div>
  );
}

export default Backlog;
