import {useParams} from "react-router-dom";
import "../App.css";
import {Project} from "../model/project/Project";
import {User} from "../model/User";
import Sidebar from "./Sidebar";
import {Accordion} from "react-bootstrap";
import {Dispatch, useEffect, useState} from "react";
import {Task} from "../model/task/Task";
import {
  stateGetAccessesByProject,
  stateGetProject,
  stateGetSprintsByProject,
  stateGetTasks
} from "../service/UseStateService";
import {capitalizedStatus, TaskState, TaskStateTable} from "../model/task/TaskState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Access} from "../model/access/Access";
import {addTask, editTask} from "../service/TaskService";
import {AxiosResponse} from "axios";
import {AddTask} from "../model/task/AddTask";
import {EditTask} from "../model/task/EditTask";
import {displayMessages} from "./Util";
import {Sprint} from "../model/sprint/Sprint";

interface Props {
  loggedUser: User;
  projects: Array<Project>;
}

function Backlog({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [accesses, setAccesses] = useState<Array<Access> | null>(null);
  const [isStateChecked, setIsStateChecked] = useState([TaskState.TODO, TaskState.DOING, TaskState.DONE]);
  const [sprints, setSprints] = useState<Array<Sprint> | null>(null);

  const [taskDate, setTaskDate] = useState<Date | null>(null);
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskAssignedUser, setTaskAssignedUser] = useState<User | undefined>(undefined);
  const [taskSprint, setTaskSprint] = useState<Sprint | undefined>(undefined);
  const [taskError, setTaskError] = useState<string>("");
  const [taskSuccess, setTaskSuccess] = useState<string>("");

  const [editedTaskId, setEditedTaskId] = useState<number | null>(null);
  const [editedTaskDate, setEditedTaskDate] = useState<Date | null>(null);
  const [editedTaskName, setEditedTaskName] = useState<string>("");
  const [editedTaskDescription, setEditedTaskDescription] = useState<string>("");
  const [editedTaskAssignedUser, setEditedTaskAssignedUser] = useState<User | undefined>(undefined);
  const [editedTaskSprint, setEditedTaskSprint] = useState<Sprint | undefined>(undefined);
  const [editedTaskError, setEditedTaskError] = useState<string>("");

  useEffect(() => {
    stateGetProject(projectName, project, setProject);
    stateGetTasks(projectName, tasks, setTasks);
    stateGetAccessesByProject(project?.id, accesses, setAccesses);
    stateGetSprintsByProject(project?.id, sprints, setSprints);
  }, [accesses, project, projectName, sprints, tasks]);

  const displayCheckbox = (state: TaskState) => {
    const checked = isStateChecked.includes(state);
    return (
      <div className="checkbox d-inline mr-3" key={state}>
        <input type="checkbox" checked={checked} onChange={() => {
          setIsStateChecked(checked ? isStateChecked.filter(x => x !== state) : [...isStateChecked, state])
        }}/>{" " + capitalizedStatus(state)}
      </div>
    )
  }

  const displayTask = (task: Task, disabled: boolean) => {
    return (
      <Accordion defaultActiveKey="1" className="accordion-task" key={task.id}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <p style={{fontSize: "large"}}>
              {task.name}
              <span className="accordion-task-right">
                <span
                  style={{marginRight: "30px"}}>{task.assignedTo ? task.assignedTo.name + " " + task.assignedTo.surname : "Unassigned"}
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
            <input type="text" className="form-control text-primary" placeholder="Enter task name" id="taskName"
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
          {displaySprintSelect(false, sprints !== null ? sprints.filter(s => !s.closed) : [], taskSprint, setTaskSprint)}
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
    addTask(new AddTask(project!.id, taskName, taskDescription, taskDate, taskAssignedUser?.id, taskSprint?.id)).then(response => {
      if ((response as AxiosResponse).status !== 201) {
        setTaskError("Unable to add task")
        return;
      }
      setTasks([...tasks, new Task(response.data)]);
      setTaskSuccess("Successfully added task");
      setTaskDate(null);
      setTaskName("");
      setTaskDescription("");
      setTaskAssignedUser(undefined);
      setTaskSprint(undefined);
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
        {displaySprintSelect(disabled, sprints !== null ? sprints.filter(s => !s.closed) : null, disabled ? task.sprint : editedTaskSprint, setEditedTaskSprint)}
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
    const oldTask = tasks.filter(t => t.id === editedTaskId)[0];
    const editedFields = [];
    if (editedTaskDate !== oldTask.end) editedFields.push("end");
    if (editedTaskName !== oldTask.name) editedFields.push("name");
    if (editedTaskDescription !== oldTask.description) editedFields.push("description");
    if (editedTaskAssignedUser?.id !== oldTask.assignedTo?.id) editedFields.push("assignedToId");
    if (editedTaskSprint?.id !== oldTask.sprint?.id) editedFields.push("sprintId");
    editTask(editedTaskId!, new EditTask(editedFields, editedTaskDate, editedTaskName, editedTaskDescription, editedTaskAssignedUser?.id, editedTaskSprint?.id, undefined)).then(response => {
      if ((response as AxiosResponse).status !== 201) {
        setEditedTaskError("Unable to edit task")
        return;
      }
      setTasks([...(tasks.filter(t => t.id !== editedTaskId!)), new Task(response.data)].sort((a, b) => a.id - b.id));
      editTaskChangeState();
      return;
    });
  }

  const displayUserSelect = (disabled: boolean, accesses: Array<Access> | null, user: User | undefined, setUser?: Dispatch<User | undefined>) => {
    return (
      <label htmlFor="taskUser">
        Assigned user:
        <select className={disabled || user === undefined ? "form-control" : "form-control text-primary"} id="taskUser"
                value={user?.id} disabled={disabled}
                onChange={event => setUser && accesses !== null ? setUser(accesses.find(access => access.user.id.toString() === event.target.value)?.user) : {}}>
          <option value={undefined} disabled={disabled}>Add assigned user</option>
          {accesses !== null ? accesses.map(access => {
            return (<option className="text-primary" value={access.user.id} key={access.user.id}
                            disabled={disabled}>
              {access.user.name + " " + access.user.surname}
            </option>)
          }) : ""}
        </select>
      </label>
    )
  }

  const displaySprintSelect = (disabled: boolean, sprints: Array<Sprint> | null, sprint: Sprint | undefined, setSprint?: Dispatch<Sprint | undefined>) => {
    const value = sprint !== undefined ? sprint?.id : undefined;
    return (
      <label htmlFor="taskUser">
        Sprint:
        <select className={disabled || sprint === undefined ? "form-control" : "form-control text-primary"}
                id="taskUser"
                value={value} disabled={disabled}
                onChange={event => setSprint && sprints !== null ? setSprint(sprints.find(s => s.id.toString() === event.target.value)) : {}}>
          <option value={undefined} disabled={disabled}>Add sprint</option>
          {sprints !== null ? sprints.map(s => {
            return (<option className="text-primary" value={s.id} key={s.id} disabled={disabled}>{s.name}</option>)
          }) : ""}
        </select>
      </label>
    )
  }

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} selectedProject={projectName}/>
        <div className="main-content">
          <div className="m-2">
            <h1>Backlog {projectName}</h1>
            {TaskStateTable.map(state => displayCheckbox(state))}
            {tasks.filter(task => isStateChecked.includes(task.taskState)).map(task => displayTask(task, task.id !== editedTaskId))}
            {displayAdd()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Backlog;
