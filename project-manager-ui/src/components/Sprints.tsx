import {useParams} from "react-router-dom";
import "../App.css";
import {Project} from "../model/Project";
import {User} from "../model/User";
import Sidebar from "./Sidebar";
import {useEffect, useState} from "react";
import {stateGetActiveSprintByProject, stateGetProject, stateGetSprintsByProject} from "../service/UseStateService";
import {Sprint} from "../model/sprint/Sprint";
import DatePicker from "react-datepicker";
import {displayMessages} from "./Util";
import {AxiosResponse} from "axios";
import {addSprint} from "../service/SprintService";
import {AddSprintDto} from "../model/sprint/AddSprintDto";

interface Props {
  loggedUser: User;
  projects: Array<Project>;
}

function Sprints({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [sprints, setSprints] = useState<Array<Sprint>>([]);
  const [activeSprint, setActiveSprint] = useState<Sprint | null>(null);

  const [sprintName, setSprintName] = useState<string>("");
  const [sprintStartDate, setSprintStartDate] = useState<Date | null>(null);
  const [sprintEndDate, setSprintEndDate] = useState<Date | null>(null);
  const [sprintError, setSprintError] = useState<string>("");
  const [sprintSuccess, setSprintSuccess] = useState<string>("");

  useEffect(() => {
    stateGetProject(projectName, project, setProject);
    stateGetSprintsByProject(project?.id, sprints, setSprints);
    stateGetActiveSprintByProject(project?.id, activeSprint, setActiveSprint)
  }, [activeSprint, project, projectName, sprints]);

  const displaySprint = (sprint: Sprint) => {
    const active = sprint.id === activeSprint?.id;
    let className = "card card-sprint";
    if (sprint.closed) className += " card-sprint-closed";
    if (active) className += " card-sprint-active";
    return (
      <div className={className} key={sprint.id}>
        <div className="card-body">
          <h5 className="card-title">{sprint.name}</h5>
          <p className="card-text">Start date: {sprint.start?.toDateString()}</p>
          <p className="card-text">End date: {sprint.end?.toDateString()}</p>
          <p className="card-text">Closed: {sprint.closed ? "yes" : "no"}</p>
          <p className="card-text">Active: {active ? "yes" : "no"}</p>
        </div>
      </div>
    )
  }

  const displayAdd = () => {
    return (
      <div className="form-group form-group-sprint">
        <label htmlFor="SprintName">
          Sprint name:
          <input type="text" className="form-control text-primary" placeholder="Enter sprint name" id="sprintName"
                 value={sprintName}
                 onChange={(event => setSprintName(event.target.value))}/>
        </label>
        <label htmlFor="sprintStart">
          Start date:
          <DatePicker onChange={date => setSprintStartDate(date)} selected={sprintStartDate}
                      className="form-control text-primary"
                      minDate={sprints.length === 0 ? undefined : sprints[sprints.length - 1].end}
                      placeholderText={"Enter Start date"} id="taskEnd" dateFormat='dd-MM-yyyy'/>
        </label>
        <label htmlFor="SprintEnd">
          End date:
          <DatePicker onChange={date => setSprintEndDate(date)} selected={sprintEndDate}
                      minDate={sprintStartDate === null ? (sprints.length === 0 ? undefined : sprints[sprints.length - 1].end) : sprintStartDate}
                      className="form-control text-primary"
                      placeholderText={"Enter end date"} id="SprintEnd" dateFormat='dd-MM-yyyy'/>
        </label>
        {displayMessages(sprintError, sprintSuccess)}
        <button className="btn btn-primary btn-block" onClick={handleAddSprint}>Add</button>
      </div>
    )
  }

  const handleAddSprint = () => {
    setSprintError("");
    setSprintSuccess("");
    const missing: Array<string> = [];
    if (sprintName === "") missing.push("name");
    if (sprintStartDate === null) missing.push("start date")
    if (sprintEndDate === null) missing.push("end date")
    if (missing.length > 0) {
      setSprintError("The following data is missing: " + missing);
      return;
    }
    const diffDays = Math.ceil((sprintEndDate!.getTime() - sprintStartDate!.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      setSprintError("Sprint have to last at least 7 days");
      return;
    }
    addSprint(new AddSprintDto(sprintName, sprintStartDate!, sprintEndDate!, project!.id)).then(response => {
      if ((response as AxiosResponse).status !== 201) {
        setSprintError("Unable to add sprint")
        return;
      }
      setSprints([...sprints, new Sprint(response.data)]);
      setSprintSuccess("Successfully added Sprint");
      setSprintName("");
      setSprintStartDate(null);
      setSprintEndDate(null);
      return;
    });
  }

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} selectedProject={projectName}/>
        <div className="d-flex flex-column main-content">
          <h1>Sprints {projectName}</h1>
          {sprints.map(sprint => displaySprint(sprint))}
          {displayAdd()}
        </div>
      </div>
    </div>
  );
}

export default Sprints;
