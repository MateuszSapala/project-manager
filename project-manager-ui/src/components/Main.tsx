import "../App.css";
import {User} from "../model/user/User";
import {Project} from "../model/project/Project";
import Sidebar from "./Sidebar";

interface Props {
  loggedUser: User | null;
  projects: Array<Project> | null;
}

function Main({loggedUser, projects}: Props) {
  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} loggedUser={loggedUser}/>
        <div className="d-flex flex-column main-content">
          <h1>Project manager</h1>
          <h3>About</h3>
          <p>Project manager is an application designed to manage work in the software development process in the agile
            methodology of Scrum. The software allows you to create projects that allow you to create and edit tasks,
            the progress of which can be tracked on the scram board. For each project, it is also possible to create and
            manage user accesses and sprints, the summary of which is facilitated by the retro tab, which allows you to
            gather support about the sprint that will help in conducting a retrospective.</p>
          <h3>Content</h3>
          <ul>
            <li>
              <h4>Projects</h4>
              <p>A drop-down tab with a list of projects available to the user and, in the case of an administrator,
                with a tab for creating a new project</p>
            </li>
            <li>
              <h4>Users</h4>
              <p>User management tab</p>
            </li>
            <li>
              <h4>Dashboard</h4>
              <p>The tab is available after selecting a project from the project list. It contains all the necessary
                information and operations for the selected project</p>
              <ol>
                <li>Backlog - list of tasks with the possibility of creating and modifying them</li>
                <li>Board - a board presenting the state of work in the current sprint</li>
                <li>Sprints - list of sprints with the eligibility of their modification</li>
                <li>Accesses - a list of users with access to the selected project, which can be changed</li>
                <li>Retro - notes, comments, questions about the sprint, which can be added by project members, which
                  are to later facilitate the retrospective
                </li>
              </ol>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Main;
