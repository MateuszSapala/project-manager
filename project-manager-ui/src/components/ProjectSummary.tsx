import {useParams} from "react-router-dom";
import "../App.css";
import {Project} from "../model/project/Project";
import {User} from "../model/user/User";
import Sidebar from "./Sidebar";
import {useEffect, useState} from "react";
import {Entitlements} from "../model/access/Entitlements";
import {stateGetEntitlements, stateGetProject} from "../service/UseStateService";

interface Props {
  loggedUser: User;
  projects: Array<Project>;
}

function ProjectSummary({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [entitlements, setEntitlements] = useState<Entitlements | undefined>(undefined);

  useEffect(() => {
    stateGetProject(projectName, project, setProject);
    stateGetEntitlements(project?.id, entitlements, setEntitlements);
  }, [entitlements, project, projectName]);
  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} selectedProject={projectName} loggedUser={loggedUser} entitlements={entitlements}/>
        <div className="d-flex flex-column main-content">
          <div className="m-2">
            <h1>Project {projectName}</h1>
            {projects.filter(p => p.name === projectName)[0]?.description.split("\n").map((text, index) => {
              return (<p key={index}>{text}</p>)
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectSummary;
