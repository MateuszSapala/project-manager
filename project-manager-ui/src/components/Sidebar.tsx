import "../index.css";
import "../App.css";
import {Accordion, Button} from "react-bootstrap";
import {Project} from "../model/project/Project";

interface Props {
  projects: Array<Project>;
  selectedProject?: string;
}

function Sidebar({projects, selectedProject}: Props) {
  const projectPath = window.location.origin + "/projects/" + selectedProject;
  const generateButton = (path: string, desc: string, key: string) => {
    return (
      <Button
        key={key}
        onClick={() => {
          window.location.replace(path);
        }}
        className="btn btn-link menu-link"
      >
        {desc}
      </Button>
    );
  };

  return (
    <div className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
      <div className="sidebar-brand-text mx-3">Project manager</div>
      <hr className="sidebar-divider my-0"/>
      <div className="nav-item" style={{marginLeft: "10px"}}>
        {generateButton(window.location.origin, "Main page", "main_page")}
      </div>
      <div className="nav-item">
        <hr className="sidebar-divider my-0"/>
        <Accordion
          defaultActiveKey={!selectedProject ? "0" : "1"}
          className="nav-link"
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Projects</Accordion.Header>
            <Accordion.Body>
              {projects.map((p: Project) => {
                return generateButton(
                  window.location.origin + "/projects/" + p.name,
                  p.name,
                  String(p.id)
                );
              })}
              <Button key={"Add project"} className="btn btn-link menu-link menu-link-add"
                      onClick={() => window.location.replace(window.location.origin + "/add/project")}>
                New project</Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <hr className="sidebar-divider my-0"/>
      <div className="nav-item" style={{marginLeft: "10px"}}>
        {generateButton(window.location.origin+"/users", "Users", "users")}
      </div>
      {selectedProject != null && (
        <>
          <hr className="sidebar-divider my-0"/>
          <div className="nav-item">
            <Accordion defaultActiveKey="0" className="nav-link">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Dashboard</Accordion.Header>
                <Accordion.Body>
                  {generateButton(projectPath + "/backlog", "Backlog", "backlog")}
                  {generateButton(projectPath + "/sprints", "Sprints", "sprints")}
                  {generateButton(projectPath + "/board", "Board", "board")}
                  {generateButton(projectPath + "/accesses", "Accesses", "accesses")}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
