import React, {useEffect, useState} from "react";
import "./css/sb-admin-2.min.css";
import "./css/sb-admin-2.css";
import "./App.css";
import Login from "./components/Login";
import Main from "./components/Main";
import Backlog from "./components/Backlog";
import {Route, Routes, useNavigate} from "react-router-dom";
import {sendVerify} from "./service/Login";
import Logout from "./components/Logout";
import {User} from "./model/user/User";
import ProjectSummary from "./components/ProjectSummary";
import {getProjects} from "./service/ProjectService";
import {AxiosResponse} from "axios";
import {Project} from "./model/project/Project";
import Board from "./components/board/Board";
import Sprints from "./components/Sprints";
import Accesses from "./components/Accesses";
import AddProjectComponent from "./components/AddProjectComponent";
import Users from "./components/Users";

function App() {
  //LOGGING
  // const [loaddingUser, setLoaddingUser] = useState<Boolean>(false);
  const [loggedUser, setloggedUser] = useState<User | null>(null);
  let navigate = useNavigate();
  useEffect(() => {
    if (loggedUser !== null) {
      console.log({loggedUser: loggedUser});
      return;
    }
    if (window.location.pathname === "/login") {
      return;
    }
    const auth: string = window.localStorage.getItem("authorization") as string;
    if (!auth) {
      navigate("/login");
    }
    // setLoaddingUser(true);
    sendVerify(window.localStorage.getItem("authorization") as string)
      .then((response) => {
        console.log({verify: response.data});
        if (window.location.pathname === "/login") {
          navigate("/");
        }
        setloggedUser(response.data);
        // setLoaddingUser(false);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 403) {
          window.location.replace(window.location.origin + "/login");
        }
      });
  }, [loggedUser, navigate]);

  //PROJECTS
  const [projects, setProjects] = useState<Array<Project> | null>(null);
  useEffect(() => {
    if (loggedUser == null || projects != null) return;
    getProjects().then((response) => {
      const resp = response as AxiosResponse;
      if (resp.status !== 200) {
        console.log("Unable to load project list");
        return;
      }
      console.log({projects: resp.data});
      setProjects(resp.data);
    });
  }, [projects, loggedUser]);

  const props = {loggedUser: loggedUser!, projects: projects != null ? projects : []}
  const projectPath = "/projects/:projectName";
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login message=""/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/" element={<Main {...props}/>}/>
        <Route path="/add/project" element={<AddProjectComponent {...props} setProjects={setProjects}/>}/>
        <Route path="/users" element={<Users {...props}/>}/>
        <Route path={projectPath} element={<ProjectSummary {...props}/>}/>
        <Route path={projectPath + "/backlog"} element={<Backlog{...props}/>}/>
        <Route path={projectPath + "/sprints"} element={<Sprints {...props}/>}/>
        <Route path={projectPath + "/board"} element={<Board {...props}/>}/>
        <Route path={projectPath + "/accesses"} element={<Accesses {...props}/>}/>
      </Routes>
    </div>
  );
}

export default App;
