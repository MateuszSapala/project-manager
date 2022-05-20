import "../index.css";
import "../App.css";
import { Accordion } from "react-bootstrap";

function Sidebar() {
  return (
    <div className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
      <div className="sidebar-brand-text mx-3">Project manager</div>
      <hr className="sidebar-divider my-0" />
      <div className="nav-item">
        <Accordion defaultActiveKey="1" className="nav-link">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Projects</Accordion.Header>
            <Accordion.Body>
              <p>Project 1</p>
              <p>Project 2</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <hr className="sidebar-divider my-0" />
      <div className="nav-item">
        <Accordion defaultActiveKey="1" className="nav-link">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Dashboard</Accordion.Header>
            <Accordion.Body>
              <p>Sth 1</p>
              <p>Sth 2</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default Sidebar;
