import {useParams} from "react-router-dom";
import "../App.css";
import {Project} from "../model/Project";
import {User} from "../model/User";
import Sidebar from "./Sidebar";
import {useEffect, useState} from "react";
import {stateGetProject, stateGetSprintsByProject} from "../service/UseStateService";
import {Sprint} from "../model/Sprint";

interface Props {
  loggedUser: User;
  projects: Array<Project>;
}

function Sprints({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [sprints, setSprints] = useState<Array<Sprint>>([]);

  useEffect(() => {
    stateGetProject(projectName, project, setProject);
    stateGetSprintsByProject(project?.id, sprints, setSprints);
  }, [project, projectName, sprints]);

  const displaySprint = (sprint: Sprint) => {
    return (
      <div className="card card-sprint">
        <div className="card-body">
          <h5 className="card-title">{sprint.name}</h5>
          <p className="card-text">Start date: {sprint.start?.toDateString()}</p>
          <p className="card-text">End date: {sprint.end?.toDateString()}</p>
        </div>
      </div>
    )
  }

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} selectedProject={projectName}/>
        <div className="d-flex flex-column main-content">
          <h1>Sprints {projectName}</h1>
          {sprints.map(sprint => displaySprint(sprint))}
        </div>
      </div>
    </div>
  );
}

export default Sprints;
