import "../index.css";
import "../App.css";
import {Accordion, Button} from "react-bootstrap";
import {Project} from "../model/project/Project";
import {User} from "../model/user/User";
import {Entitlements} from "../model/access/Entitlements";
import {Circles} from "react-loader-spinner";
import React from "react";

interface Props {
  loggedUser: User | null;
  projects: Array<Project> | null;
  selectedProject?: string;
  entitlements?: Entitlements;
}

function Sidebar({projects, selectedProject, loggedUser, entitlements}: Props) {
  const projectPath = window.location.origin + "/projects/" + selectedProject;
  const generateButton = (path: string, desc: string, key: string) => {
    return (
      <Button key={key} className="btn btn-link menu-link" onClick={() => window.location.replace(path)}>{desc}</Button>
    );
  };

  const isLoading = () => loggedUser === null || projects === null || (selectedProject !== undefined && entitlements === undefined);

  return (
    <div className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
      <div className="sidebar-brand-text mx-3">Project manager</div>
      <hr className="sidebar-divider my-0"/>
      <div className="nav-item" style={{marginLeft: "10px"}}>
        {generateButton(window.location.origin, "Main page", "main_page")}
      </div>
      <hr className="sidebar-divider my-0"/>
      {isLoading() && <div className={"w-50 d-flex justify-content-center"} style={{background: "transparent"}}>
          <Circles color="#00BFFF" height={50} width={50}/>
      </div>}
      {!isLoading() && <div className="nav-item">
          <Accordion defaultActiveKey={!selectedProject ? "0" : "1"} className="nav-link">
              <Accordion.Item eventKey="0">
                  <Accordion.Header>Projects</Accordion.Header>
                  <Accordion.Body>
                    {projects !== null && projects.map(p => generateButton(window.location.origin + "/projects/" + p.name, p.name, String(p.id)))}
                    {loggedUser?.admin ?
                      <Button key={"Add project"} className="btn btn-link menu-link menu-link-add"
                              onClick={() => window.location.replace(window.location.origin + "/add/project")}>
                        New project</Button> : ""}
                  </Accordion.Body>
              </Accordion.Item>
          </Accordion>
      </div>}
      {!isLoading() && loggedUser?.admin && <>
          <hr className="sidebar-divider my-0"/>
          <div className="nav-item" style={{marginLeft: "10px"}}>
            {generateButton(window.location.origin + "/users", "Users", "users")}
          </div>
      </>}
      {!isLoading() && selectedProject !== null && selectedProject !== undefined &&
          <>
              <hr className="sidebar-divider my-0"/>
              <div className="nav-item">
                  <Accordion defaultActiveKey="0" className="nav-link">
                      <Accordion.Item eventKey="0">
                          <Accordion.Header>Dashboard</Accordion.Header>
                          <Accordion.Body>
                            {entitlements?.taskViewing && generateButton(projectPath + "/backlog", "Backlog", "backlog")}
                            {entitlements?.taskViewing && generateButton(projectPath + "/board", "Board", "board")}
                            {entitlements?.sprintViewing && generateButton(projectPath + "/sprints", "Sprints", "sprints")}
                            {entitlements?.accessViewing && generateButton(projectPath + "/accesses", "Accesses", "accesses")}
                            {entitlements?.retroNoteViewing && generateButton(projectPath + "/retro", "Retro", "retro")}
                          </Accordion.Body>
                      </Accordion.Item>
                  </Accordion>
              </div>
          </>
      }
      <hr className="sidebar-divider my-0"/>
      <div className="nav-item" style={{marginLeft: "10px"}}>
        <Button key={"logout"} className="btn btn-link menu-link" onClick={() => {
          window.localStorage.removeItem("authorization");
          window.location.replace("/login");
        }}>Logout</Button>
      </div>
    </div>
  );
}

export default Sidebar;
