import "../App.css";
import { User } from "../model/User";
import { Accordion, Button } from "react-bootstrap";
import { Project } from "../model/Project";

interface Props {
  loggedUser: User;
  content: JSX.Element;
  projects: Array<Project>;
}

function Main({ loggedUser, content, projects }: Props) {
  const Content = () => <div className="content">{content}</div>;

  return (
    <div id="page-top">
      <div id="wrapper">
        {/* <p style={{ backgroundColor: "black" }}>dasdas</p> */}
        <div className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
          <div className="sidebar-brand-text mx-3">Project manager</div>
          <hr className="sidebar-divider my-0" />
          <div className="nav-item">
            <Accordion defaultActiveKey="1" className="nav-link">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Projects</Accordion.Header>
                <Accordion.Body>
                  {projects.map((p: Project) => {
                    return (
                      <Button
                        key={p.id}
                        onClick={() => {
                          window.location.replace(
                            window.location.origin + "/projects/" + p.name
                          );
                        }}
                        className="btn btn-link menu-link"
                      >
                        {p.name}
                      </Button>
                    );
                  })}
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
          style={{ paddingLeft: 180 }}
        >
          <Content />
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
