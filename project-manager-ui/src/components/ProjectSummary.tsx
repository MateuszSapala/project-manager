import {useParams} from "react-router-dom";
import "../App.css";
import {Project} from "../model/Project";
import {User} from "../model/User";
import Sidebar from "./Sidebar";

interface Props {
  loggedUser: User;
  projects: Array<Project>;
}

function ProjectSummary({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} selectedProject={projectName}/>
        <div className="d-flex flex-column main-content">
          <h1>Project {projectName}</h1>
        </div>
      </div>
    </div>
  );
}

export default ProjectSummary;
