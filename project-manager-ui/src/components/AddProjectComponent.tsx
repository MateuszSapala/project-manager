import "../App.css";
import {User} from "../model/user/User";
import {Project} from "../model/project/Project";
import Sidebar from "./Sidebar";
import {Dispatch, useState} from "react";
import {AxiosResponse} from "axios";
import {addProject} from "../service/ProjectService";
import {AddProject} from "../model/project/AddProject";
import {displayMessages} from "./Util";
import {useNavigate} from "react-router-dom";
import {
  translateAdd,
  translateDescription,
  translateEnterDescription,
  translateEnterName,
  translateName,
  translateNewProject,
  translateTheFollowingDataIsMissing,
  translateUnableToAddProject
} from "../service/LanguageService";

interface Props {
  loggedUser: User | null;
  projects: Array<Project> | null;
  setProjects: Dispatch<Array<Project>>;
}

function AddProjectComponent({loggedUser, projects, setProjects}: Props) {
  if (loggedUser !== undefined && loggedUser !== null && !loggedUser.admin) {
    window.location.replace(window.location.origin);
  }
  let navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAddProject = () => {
    setError("");
    const missing: Array<string> = [];
    if (name === "") missing.push(translateName());
    if (description === "") missing.push(translateDescription())
    if (missing.length > 0) {
      setError(translateTheFollowingDataIsMissing(missing));
      return;
    }
    if (projects === null) return;
    addProject(new AddProject(name, description)).then(response => {
      if ((response as AxiosResponse).status !== 201) {
        setError(translateUnableToAddProject())
        return;
      }
      setProjects([...projects, response.data])
      navigate("/projects/" + name);
      return;
    });
  }

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} loggedUser={loggedUser}/>
        <div className="d-flex flex-column main-content">
          <div className="m-2">
            <h1>{translateNewProject()}</h1>
            <div>
              <div className="form-group">
                <label htmlFor="taskName">
                  {translateName()}:
                  <input type="text" className="form-control text-primary" placeholder={translateEnterName()}
                         id="projectName"
                         value={name}
                         onChange={(event => setName(event.target.value))}/>
                </label>
                <label htmlFor="taskDescription">
                  {translateDescription()}:
                  <textarea className="form-control text-primary" placeholder={translateEnterDescription()}
                            id="projectDescription"
                            value={description} rows={10}
                            onChange={(event => setDescription(event.target.value))}/>
                </label>
                {displayMessages(error)}
                <button className="btn btn-primary btn-block" onClick={handleAddProject}>{translateAdd()}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProjectComponent;
