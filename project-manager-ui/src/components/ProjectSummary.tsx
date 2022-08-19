import {useParams} from "react-router-dom";
import "../App.css";
import {Project} from "../model/project/Project";
import {User} from "../model/user/User";
import Sidebar from "./Sidebar";
import {useEffect, useState} from "react";
import {Entitlements} from "../model/access/Entitlements";
import {stateGetEntitlements, stateGetProject} from "../service/UseStateService";
import {loader} from "./Util";
import {translateProject} from "../service/LanguageService";

interface Props {
  loggedUser: User | null;
  projects: Array<Project> | null;
}

function ProjectSummary({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [entitlements, setEntitlements] = useState<Entitlements | undefined>(undefined);

  useEffect(() => {
    stateGetProject(projectName, project, setProject);
    stateGetEntitlements(project?.id, entitlements, setEntitlements);
  }, [entitlements, project, projectName]);

  const isLoading = () => project == null || entitlements == null;
  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} selectedProject={projectName} loggedUser={loggedUser} entitlements={entitlements}/>
        <div className="d-flex flex-column main-content">
          <div className="m-2">
            <h1>{translateProject()} {projectName}</h1>
            {isLoading() && loader()}
            {!isLoading() && projects !== null && projects.filter(p => p.name === projectName)[0]?.description.split("\n").map((text, index) => {
              return (<p key={index}>{text}</p>)
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectSummary;
