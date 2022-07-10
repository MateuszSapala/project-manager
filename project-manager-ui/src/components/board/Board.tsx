import {DndProvider} from "react-dnd";
import {useParams} from "react-router-dom";
import "../../App.css";
import {Project} from "../../model/project/Project";
import {User} from "../../model/user/User";
import Sidebar from "../Sidebar";
import {HTML5Backend} from "react-dnd-html5-backend";
import TaskBoard from "./TaskBoard";

interface Props {
  loggedUser: User;
  projects: Array<Project>;
}

function Board({loggedUser, projects}: Props) {
  let {projectName} = useParams();

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} selectedProject={projectName}/>
        <div className="d-flex flex-column main-content">
          <div className="m-2">
            <h1>Board {projectName}</h1>
            <DndProvider backend={HTML5Backend}>
              {<TaskBoard projectName={projectName}/>}
            </DndProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
