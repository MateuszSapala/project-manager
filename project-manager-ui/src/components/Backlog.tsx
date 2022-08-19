import {useParams} from "react-router-dom";
import "../App.css";
import {Project} from "../model/project/Project";
import {User} from "../model/user/User";
import Sidebar from "./Sidebar";
import {Accordion} from "react-bootstrap";
import React, {Dispatch, useEffect, useState} from "react";
import {Task} from "../model/task/Task";
import {
  stateGetAccessesByProject,
  stateGetActiveSprintByProject,
  stateGetEntitlements,
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
import {displayMessages, loader} from "./Util";
import {Sprint} from "../model/sprint/Sprint";
import {Entitlements} from "../model/access/Entitlements";
import {capitalizedOption, SprintCheckboxOption, SprintCheckboxOptionTable} from "../model/sprint/SprintCheckboxOption";
import {
  translateAdd,
  translateAssignedUser,
  translateBacklogProject,
  translateCancel,
  translateDescription,
  translateEdit,
  translateEndDate,
  translateEnterAssignedUser,
  translateEnterDescription,
  translateEnterEndDate,
  translateEnterName,
  translateEnterSprint,
  translateName,
  translateSave,
  translateSprint,
  translateState,
  translateSuccessfullyAddedTask,
  translateTheFollowingDataIsMissing,
  translateUnableToAddTask,
  translateUnableToEditTask,
  translateUnassigned
} from "../service/LanguageService";

interface Props {
  loggedUser: User | null;
  projects: Array<Project> | null;
}

function Backlog({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Array<Task> | null>(null);
  const [accesses, setAccesses] = useState<Array<Access> | null>(null);
  const [isStateChecked, setIsStateChecked] = useState(TaskStateTable);
  const [sprintState, setSprintState] = useState([SprintCheckboxOption.CURRENT, SprintCheckboxOption.FUTURE, SprintCheckboxOption.NOT_ASSIGNED]);
  const [sprints, setSprints] = useState<Array<Sprint> | null>(null);
  const [activeSprint, setActiveSprint] = useState<Sprint | null>(null);
  const [entitlements, setEntitlements] = useState<Entitlements | undefined>(undefined);

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
  }, [projectName, project]);
  useEffect(() => {
    stateGetTasks(projectName, tasks, setTasks);
  }, [projectName, tasks]);
  useEffect(() => {
    stateGetAccessesByProject(project?.id, accesses, setAccesses);
  }, [project?.id, accesses]);
  useEffect(() => {
    stateGetSprintsByProject(project?.id, sprints, setSprints);
  }, [project?.id, sprints]);
  useEffect(() => {
    stateGetActiveSprintByProject(project?.id, activeSprint, setActiveSprint);
  }, [project?.id, activeSprint]);
  useEffect(() => {
    if (entitlements !== undefined && !entitlements.taskViewing) {
      window.location.replace(window.location.origin + "/projects/" + projectName);
    }
    stateGetEntitlements(project?.id, entitlements, setEntitlements);
  }, [project?.id, entitlements, projectName]);

  const isLoading = () => accesses === null || entitlements === null || project === null || projectName === null || sprints === null || activeSprint === null || tasks === null;

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

  const displaySprintCheckbox = (option: SprintCheckboxOption) => {
    const checked = sprintState.includes(option);
    return (
      <div className="checkbox d-inline mr-3" key={option}>
        <input type="checkbox" checked={checked}
               onChange={() => setSprintState(checked ? sprintState.filter(x => x !== option) : [...sprintState, option])}/>
        {" " + capitalizedOption(option)}
      </div>
    )
  }

  const displayTask = (task: Task, disabled: boolean) => {
    return (
      <Accordion defaultActiveKey="1" className="accordion-task" key={task.id}>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="m-3">
            <p style={{fontSize: "large"}}>
              {task.name}
              <span className="accordion-task-right">
                <span
                  style={{marginRight: "20px"}}>{task.assignedTo ? task.assignedTo.name + " " + task.assignedTo.surname : translateUnassigned()}
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
            {translateName()}:
            <input type="text" className="form-control text-primary" placeholder={translateEnterName()} id="taskName"
                   value={taskName}
                   onChange={(event => setTaskName(event.target.value))}/>
          </label>
          <label htmlFor="taskDescription">
            {translateDescription()}:
            <textarea className="form-control text-primary" placeholder={translateEnterDescription()}
                      id="taskDescription"
                      value={taskDescription}
                      onChange={(event => setTaskDescription(event.target.value))}/>
          </label>
          <label htmlFor="taskEnd">
            {translateEndDate()}:
            <DatePicker onChange={date => setTaskDate(date)} selected={taskDate} className="form-control text-primary"
                        placeholderText={translateEnterEndDate()} id="taskEnd" dateFormat='dd-MM-yyyy'/>
          </label>
          {displayUserSelect(false, accesses, taskAssignedUser, setTaskAssignedUser)}
          {displaySprintSelect(false, sprints !== null ? sprints.filter(s => !s.closed) : [], taskSprint, setTaskSprint)}
          {displayMessages(taskError, taskSuccess)}
          <button className="btn btn-primary btn-block" onClick={handleAddTask}>{translateAdd()}</button>
        </div>
      </div>
    )
  }

  const handleAddTask = () => {
    setTaskError("");
    setTaskSuccess("");
    const missing: Array<string> = [];
    if (taskName === "") missing.push(translateName());
    if (taskDescription === "") missing.push(translateDescription())
    if (missing.length > 0) {
      setTaskError(translateTheFollowingDataIsMissing(missing));
      return;
    }
    if (tasks === null) return;
    addTask(new AddTask(project!.id, taskName, taskDescription, taskDate, taskAssignedUser?.id, taskSprint?.id)).then(response => {
      if ((response as AxiosResponse).status !== 201) {
        setTaskError(translateUnableToAddTask())
        return;
      }
      setTasks([...tasks, new Task(response.data)]);
      setTaskSuccess(translateSuccessfullyAddedTask());
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
      <div className="form-group m-3">
        <p>{translateState()}: {capitalizedStatus(task.taskState)}</p>
        {disabled ? "" :
          <label htmlFor="taskName">
            {translateName()}:
            <input type="text" className="form-control text-primary" placeholder={task.name} id="taskName"
                   value={disabled ? "" : editedTaskName} disabled={disabled}
                   onChange={(event => setEditedTaskName(event.target.value))}/>
          </label>}
        <label htmlFor="taskDescription">
          {translateDescription()}:
          <textarea className="form-control text-primary" placeholder={task.description} id="taskDescription"
                    value={disabled ? "" : editedTaskDescription} disabled={disabled}
                    onChange={(event => setEditedTaskDescription(event.target.value))}/>
        </label>
        <label htmlFor="taskEnd">
          {translateEndDate()}:
          <DatePicker onChange={date => setEditedTaskDate(date)} selected={disabled ? task.end : editedTaskDate}
                      className={disabled ? "form-control" : "form-control text-primary"} disabled={disabled}
                      placeholderText={translateEnterEndDate()} id="taskEnd" dateFormat='dd-MM-yyyy'/>
        </label>
        {displayUserSelect(disabled, accesses, disabled ? task.assignedTo : editedTaskAssignedUser, setEditedTaskAssignedUser)}
        {displaySprintSelect(disabled, sprints !== null ? sprints.filter(s => !s.closed) : null, disabled ? task.sprint : editedTaskSprint, setEditedTaskSprint)}
        {displayMessages(editedTaskError)}
        {!entitlements?.taskEditing && <br/>}
        {entitlements?.taskEditing && disabled ?
          <div className="accordion-buttons-container">
            <button className="btn btn-primary btn-block"
                    onClick={() => editTaskChangeState(task)}>{translateEdit()}
            </button>
          </div> : ""}
        {entitlements?.taskEditing && !disabled ?
          <div className="accordion-buttons-container">
            <div className="two-buttons float-left">
              <button className="btn btn-primary btn-block" onClick={handleSaveTask}>
                {translateSave()}
              </button>
            </div>
            <div className="two-buttons float-right">
              <button className="btn btn-primary btn-block" onClick={() => editTaskChangeState()}>
                {translateCancel()}
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
    setEditedTaskSprint(task !== undefined ? task.sprint : undefined);
    setEditedTaskError("");
  }

  const handleSaveTask = () => {
    setEditedTaskError("");
    const missing: Array<string> = [];
    if (editedTaskName === "") missing.push(translateName());
    if (editedTaskDescription === "") missing.push(translateDescription())
    if (missing.length > 0) {
      setEditedTaskError(translateTheFollowingDataIsMissing(missing));
      return;
    }
    if (tasks === null) return;
    const oldTask = tasks.filter(t => t.id === editedTaskId)[0];
    const editedFields = [];
    if (editedTaskDate !== oldTask.end) editedFields.push("end");
    if (editedTaskName !== oldTask.name) editedFields.push("name");
    if (editedTaskDescription !== oldTask.description) editedFields.push("description");
    if (editedTaskAssignedUser?.id !== oldTask.assignedTo?.id) editedFields.push("assignedToId");
    if (editedTaskSprint?.id !== oldTask.sprint?.id) editedFields.push("sprintId");
    editTask(editedTaskId!, new EditTask(editedFields, editedTaskDate, editedTaskName, editedTaskDescription, editedTaskAssignedUser?.id, editedTaskSprint?.id, undefined)).then(response => {
      if ((response as AxiosResponse).status !== 201) {
        setEditedTaskError(translateUnableToEditTask())
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
        {translateAssignedUser()}:
        <select
          className={disabled || !user ? "form-control" : "form-control text-primary"}
          id="taskUser" value={user ? user.id : ""} disabled={disabled}
          onChange={event => setUser && accesses !== null ? setUser(accesses.find(access => access.user.id.toString() === event.target.value)?.user) : {}}>
          <option value="" disabled={disabled}>{translateEnterAssignedUser()}</option>
          {accesses ? accesses.map(access => {
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
    const value = sprint ? sprint.id : "";
    return (
      <label htmlFor="taskUser">
        {translateSprint()}:
        <select
          className={disabled || !sprint ? "form-control" : "form-control text-primary"}
          id="taskUser" value={value} disabled={disabled} placeholder={value === "" ? undefined : sprint?.name}
          onChange={event => setSprint && sprints !== null ? setSprint(sprints.find(s => s.id.toString() === event.target.value)) : {}}>
          <option value="" disabled={disabled}>{translateEnterSprint()}</option>
          {sprints ? sprints.map(s => {
            return (<option className="text-primary" value={s.id} key={s.id} disabled={disabled}>{s.name}</option>)
          }) : ""}
          {value !== "" && sprints?.filter(s => s.id === sprint?.id).length! < 1 &&
              <option className="text-primary" value={value} key={value} disabled={true}>{sprint?.name}</option>}
        </select>
      </label>
    )
  }

  const filter = (task: Task) => {
    if (task.sprint === null || task.sprint === undefined) {
      return sprintState.includes(SprintCheckboxOption.NOT_ASSIGNED);
    }
    const activeSprintId: number = activeSprint && activeSprint.id ? activeSprint.id : (sprints && sprints?.length > 0 ? sprints[sprints?.length - 1].id + 1 : 0);
    if (!sprintState.includes(SprintCheckboxOption.PREVIOUS) && task.sprint?.id < activeSprintId) {
      return false;
    }
    if (!sprintState.includes(SprintCheckboxOption.CURRENT) && task.sprint?.id === activeSprintId) {
      return false;
    }
    return !(!sprintState.includes(SprintCheckboxOption.FUTURE) && task.sprint?.id > activeSprintId);
  }

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} selectedProject={projectName} loggedUser={loggedUser}
                 entitlements={entitlements}/>
        <div className="main-content">
          <div className="m-2">
            <h1>{translateBacklogProject(projectName ? projectName : "")}</h1>
            {isLoading() && loader()}
            {!isLoading() &&
                <>
                    <hr className="sidebar-divider my-0"/>
                    <div className="d-inline-block mr-5">
                        <p className="h4 text-center">{translateState()}</p>
                      {TaskStateTable.map(state => displayCheckbox(state))}
                    </div>

                    <div className="d-inline-block">
                        <p className="h4 text-center">{translateSprint()}</p>
                      {SprintCheckboxOptionTable.map(option => displaySprintCheckbox(option))}
                    </div>
                    <hr className="sidebar-divider my-0"/>
                </>
            }
            {!isLoading() && tasks !== null && tasks.filter(task => isStateChecked
              .includes(task.taskState))
              .filter(task => filter(task))
              .map(task => displayTask(task, task.id !== editedTaskId))}
            {!isLoading() && entitlements?.taskEditing && displayAdd()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Backlog;
