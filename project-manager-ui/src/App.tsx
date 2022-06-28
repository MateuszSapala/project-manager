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
import {User} from "./model/User";
import ProjectSummary from "./components/ProjectSummary";
import {getProjects} from "./service/ProjectService";
import {AxiosResponse} from "axios";
import {Project} from "./model/Project";
import Board from "./components/board/Board";
import Sprints from "./components/Sprints";
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
  }, [loggedUser]);

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

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login message=""/>}/>
        <Route path="/logout" element={<Logout/>}/>

        <Route
          path="/"
          element={
            <Main
              loggedUser={loggedUser!}
              projects={projects != null ? projects : []}
            />
          }
        />
        <Route
          path="/projects/:projectName"
          element={
            <ProjectSummary
              loggedUser={loggedUser!}
              projects={projects != null ? projects : []}
            />
          }
        />
        <Route
          path="/projects/:projectName/backlog"
          element={
            <Backlog
              loggedUser={loggedUser!}
              projects={projects != null ? projects : []}
            />
          }
        />
        <Route
          path="/projects/:projectName/sprints"
          element={
            <Sprints
              loggedUser={loggedUser!}
              projects={projects != null ? projects : []}
            />
          }
        />
        <Route
          path="/projects/:projectName/board"
          element={
            <Board
              loggedUser={loggedUser!}
              projects={projects != null ? projects : []}
            />
          }
        />
        <Route
          path="/projects/:projectName/users"
          element={
            <Users
              loggedUser={loggedUser!}
              projects={projects != null ? projects : []}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
