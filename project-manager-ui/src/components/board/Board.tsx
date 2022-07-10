import {DndProvider} from "react-dnd";
import {useParams} from "react-router-dom";
import "../../App.css";
import {Project} from "../../model/project/Project";
import {User} from "../../model/user/User";
import Sidebar from "../Sidebar";
import {HTML5Backend} from "react-dnd-html5-backend";
import TaskBoard from "./TaskBoard";
import {useEffect, useState} from "react";
import {stateGetEntitlements, stateGetProject} from "../../service/UseStateService";
import {Entitlements} from "../../model/access/Entitlements";

interface Props {
  loggedUser: User;
  projects: Array<Project>;
}

function Board({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [entitlements, setEntitlements] = useState<Entitlements | undefined>(undefined);

  useEffect(() => {
    if (entitlements !== undefined && !entitlements.taskViewing) {
      window.location.replace(window.location.origin + "/projects/" + projectName);
    }
    stateGetProject(projectName, project, setProject);
    stateGetEntitlements(project?.id, entitlements, setEntitlements);
  }, [entitlements, project, projectName]);

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} selectedProject={projectName} loggedUser={loggedUser} entitlements={entitlements}/>
        <div className="d-flex flex-column main-content">
          <div className="m-2">
            <h1>Board {projectName}</h1>
            <DndProvider backend={HTML5Backend}>
              {<TaskBoard projectName={projectName} canEdit={entitlements?.taskEditing === true}/>}
            </DndProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
