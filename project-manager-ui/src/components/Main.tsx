import "../App.css";
import {User} from "../model/user/User";
import {Project} from "../model/project/Project";
import Sidebar from "./Sidebar";

interface Props {
  loggedUser: User;
  projects: Array<Project>;
}

function Main({loggedUser, projects}: Props) {
  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} loggedUser={loggedUser}/>
        <div className="d-flex flex-column main-content">
          <h1>This is start page</h1>
        </div>
      </div>
    </div>
  );
}

export default Main;
