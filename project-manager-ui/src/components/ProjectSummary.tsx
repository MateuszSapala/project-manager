import {useParams} from "react-router-dom";
import "../App.css";
import {Project} from "../model/project/Project";
import {User} from "../model/user/User";
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
          <div className="m-2">
            <h1>Project {projectName}</h1>
            {projects.filter(p => p.name === projectName)[0]?.description.split("\n").map(text => {
              return (<p>{text}</p>)
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectSummary;
