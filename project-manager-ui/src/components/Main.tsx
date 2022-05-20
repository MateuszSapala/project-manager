import "../App.css";
import { User } from "../model/User";
import Sidebar from "./Sidebar";
import { Accordion } from "react-bootstrap";

interface Props {
  loggedUser: User;
}

function Main({ loggedUser }: Props) {
  return (
    <div id="page-top">
      <div id="wrapper">
        <p style={{ backgroundColor: "black" }}>dasdas</p>
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
        <p style={{ backgroundColor: "black" }}>dasdas</p>
        <div
          id="content-wrapper"
          className="d-flex flex-column"
          style={{ paddingLeft: 135 }}
        >
          <div id="content">
            <h1 className="h3 mb-4 text-gray-800">Blank Pagessss</h1>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
      {/* <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
              </a> */}
    </div>
  );
}

export default Main;
