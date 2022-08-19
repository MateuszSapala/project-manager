import {useParams} from "react-router-dom";
import "../App.css";
import {Project} from "../model/project/Project";
import {User} from "../model/user/User";
import Sidebar from "./Sidebar";
import {useEffect, useState} from "react";
import {
  stateGetActiveSprintByProject,
  stateGetEntitlements,
  stateGetProject,
  stateGetSprintsByProject
} from "../service/UseStateService";
import {Sprint} from "../model/sprint/Sprint";
import DatePicker from "react-datepicker";
import {displayMessages, loader, yesNoOption} from "./Util";
import {AxiosResponse} from "axios";
import {addSprint, closeSprint} from "../service/SprintService";
import {AddSprintDto} from "../model/sprint/AddSprintDto";
import {confirm} from "react-confirm-box";
import {Entitlements} from "../model/access/Entitlements";
import {
  translateActive,
  translateAdd,
  translateAreYouSureYouWantToCloseSprint,
  translateClosed,
  translateCloseSprint,
  translateEndDate,
  translateEnterEndDate,
  translateEnterName,
  translateEnterStartDate,
  translateName,
  translateNo,
  translateSprintHaveTo7Days,
  translateSprintName,
  translateSprints,
  translateStartDate,
  translateSuccessfullyAddedSprint,
  translateTheFollowingDataIsMissing,
  translateUnableToAddSprint,
  translateYes
} from "../service/LanguageService";

interface Props {
  loggedUser: User | null;
  projects: Array<Project> | null;
}

function Sprints({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [sprints, setSprints] = useState<Array<Sprint> | null>(null);
  const [activeSprint, setActiveSprint] = useState<Sprint | null>(null);
  const [entitlements, setEntitlements] = useState<Entitlements | undefined>(undefined);

  const [sprintName, setSprintName] = useState<string>("");
  const [sprintStartDate, setSprintStartDate] = useState<Date | null>(null);
  const [sprintEndDate, setSprintEndDate] = useState<Date | null>(null);
  const [sprintError, setSprintError] = useState<string>("");
  const [sprintSuccess, setSprintSuccess] = useState<string>("");

  useEffect(() => {
    stateGetProject(projectName, project, setProject);
  }, [project, projectName]);
  useEffect(() => {
    stateGetSprintsByProject(project?.id, sprints, setSprints);
  }, [project, sprints]);
  useEffect(() => {
    stateGetActiveSprintByProject(project?.id, activeSprint, setActiveSprint);
  }, [activeSprint, project]);
  useEffect(() => {
    if (entitlements !== undefined && !entitlements.sprintViewing) {
      window.location.replace(window.location.origin + "/projects/" + projectName);
    }
    stateGetEntitlements(project?.id, entitlements, setEntitlements);
  }, [entitlements, project, projectName]);

  const isLoading = () => project === null || sprints === null || activeSprint === null || entitlements === null;

  const displaySprint = (sprint: Sprint) => {
    const active = sprint.id === activeSprint?.id;
    let className = "card card-sprint";
    if (sprint.closed) className += " card-sprint-closed";
    if (active) className += " card-sprint-active";
    return (
      <div className={className} key={sprint.id}>
        <div className="card-body">
          <h5 className="card-title">{sprint.name}</h5>
          <p className="card-text">{translateStartDate()}: {sprint.start?.toDateString()}</p>
          <p className="card-text">{translateEndDate()}: {sprint.end?.toDateString()}</p>
          <p className="card-text">{translateClosed()}: {sprint.closed ? translateYes() : translateNo()}</p>
          <p className="card-text">{translateActive()}: {active ? translateYes() : translateNo()}</p>
          {entitlements?.sprintEditing && active &&
              <button className="btn btn-primary m-2" onClick={async () => {
                const result = await confirm(translateAreYouSureYouWantToCloseSprint(sprintName), yesNoOption);
                if (!result) {
                  console.log("Cancelled");
                  return;
                }
                closeSprint(sprint.id).then((response) => {
                  const resp = response as AxiosResponse;
                  if (resp.status !== 204) {
                    console.log("Unable to close sprint");
                    return;
                  }
                  sprint.closed = true;
                  setActiveSprint(null);
                  if (sprints === null) return;
                  setSprints([...(sprints.filter(s => s.id !== sprint.id)), sprint].sort((a, b) => a.id - b.id))
                });
              }}>{translateCloseSprint()}
              </button>}
        </div>
      </div>
    )
  }

  const displayAdd = () => {
    return (
      <div className="form-group">
        <label htmlFor="SprintName">
          {translateSprintName()}:
          <input type="text" className="form-control text-primary" placeholder={translateEnterName()} id="sprintName"
                 value={sprintName}
                 onChange={(event => setSprintName(event.target.value))}/>
        </label>
        <label htmlFor="sprintStart">
          {translateStartDate()}:
          <DatePicker onChange={date => setSprintStartDate(date)} selected={sprintStartDate}
                      className="form-control text-primary"
                      minDate={sprints === null || sprints.length === 0 ? undefined : sprints[sprints.length - 1].end}
                      placeholderText={translateEnterStartDate()} id="taskEnd" dateFormat='dd-MM-yyyy'/>
        </label>
        <label htmlFor="SprintEnd">
          {translateEndDate()}:
          <DatePicker onChange={date => setSprintEndDate(date)} selected={sprintEndDate}
                      minDate={sprintStartDate === null ? (sprints === null || sprints.length === 0 ? undefined : sprints[sprints.length - 1].end) : sprintStartDate}
                      className="form-control text-primary"
                      placeholderText={translateEnterEndDate()} id="SprintEnd" dateFormat='dd-MM-yyyy'/>
        </label>
        {displayMessages(sprintError, sprintSuccess)}
        <button className="btn btn-primary btn-block" onClick={handleAddSprint}>{translateAdd()}</button>
      </div>
    )
  }

  const handleAddSprint = () => {
    setSprintError("");
    setSprintSuccess("");
    const missing: Array<string> = [];
    if (sprintName === "") missing.push(translateName());
    if (sprintStartDate === null) missing.push(translateStartDate())
    if (sprintEndDate === null) missing.push(translateEndDate())
    if (missing.length > 0) {
      setSprintError(translateTheFollowingDataIsMissing(missing));
      return;
    }
    const diffDays = Math.ceil((sprintEndDate!.getTime() - sprintStartDate!.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      setSprintError(translateSprintHaveTo7Days);
      return;
    }
    addSprint(new AddSprintDto(sprintName, sprintStartDate!, sprintEndDate!, project!.id)).then(response => {
      if ((response as AxiosResponse).status !== 201) {
        setSprintError(translateUnableToAddSprint)
        return;
      }
      if (sprints === null) return;
      if (sprints.length === 0 || !activeSprint?.id) setActiveSprint(new Sprint(response.data));
      setSprints([...sprints, new Sprint(response.data)]);
      setSprintSuccess(translateSuccessfullyAddedSprint);
      setSprintName("");
      setSprintStartDate(null);
      setSprintEndDate(null);
      return;
    });
  }

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} selectedProject={projectName} loggedUser={loggedUser} entitlements={entitlements}/>
        <div className="d-flex flex-column main-content ">
          <div className="m-2">
            <h1>{translateSprints()} {projectName}</h1>
            {isLoading() && loader()}
            {!isLoading() && sprints !== null ? sprints.map(sprint => displaySprint(sprint)) : ""}
            {!isLoading() && entitlements?.sprintEditing && displayAdd()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sprints;
