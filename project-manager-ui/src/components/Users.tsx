import {useParams} from "react-router-dom";
import "../App.css";
import {Project} from "../model/Project";
import {User} from "../model/User";
import Sidebar from "./Sidebar";
import {Dispatch, useEffect, useState} from "react";
import {Access} from "../model/access/Access";
import {stateGetAccessesByProject, stateGetProject, stateGetUsers} from "../service/UseStateService";
import {ProjectRole, ProjectRoleTable, projectRoleToString} from "../model/access/ProjectRole";
import {displayMessages} from "./Util";
import {AxiosResponse} from "axios";
import {editAccess} from "../service/AccessService";
import {EditAccess} from "../model/access/EditAccess";

interface Props {
  loggedUser: User;
  projects: Array<Project>;
}

function Users({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [accesses, setAccesses] = useState<Array<Access>>([]);
  const [users, setUsers] = useState<Array<User>>([]);

  const [editedId, setEditedId] = useState<number | null>(null);
  const [editedRole, setEditedRole] = useState<ProjectRole | null>(null);
  const [editError, setEditError] = useState<string>("");

  useEffect(() => {
    stateGetProject(projectName, project, setProject);
    stateGetAccessesByProject(project?.id, accesses, setAccesses);
    stateGetUsers(users, setUsers);
  }, [accesses, project, projectName, users]);

  const displayAccess = (access: Access) => {
    return (
      <div className="card card-user" key={access.user.id}>
        <div className="card-body">
          <h5 className="card-title">{access.user.name + " " + access.user.surname}</h5>
          <p className="card-text">Email: {access.user.email}</p>
          <p className="card-text">Role: {projectRoleToString(access.projectRole)}</p>
          {access.id === editedId ? displayCheckboxes() : ""}
          {displayMessages(editError)}
          {displayButtons(access.id)}
        </div>
      </div>
    )
  }

  const displayCheckboxes = () => {
    return (
      <div>
        {ProjectRoleTable.map(r => <div className="checkbox d-inline mr-3" key={r}>
          <input type="checkbox" checked={editedRole === r}
                 onChange={() => setEditedRole(r)}/>{" " + projectRoleToString(r)}
        </div>)}
      </div>
    )
  }

  const displayButtons = (accessId: number) => {
    if (accessId !== editedId) {
      return (<button className="btn btn-primary m-2" onClick={() => {
        setEditedId(accessId);
        setEditedRole(null);
      }}>Edit</button>)
    }
    return (
      <div>
        <button className="btn btn-primary m-2" onClick={() => {
          if (editedRole === null) {
            setEditError("Role not selected");
            return;
          }
          const access = accesses.filter(a => a.id === editedId)[0];
          if (editedRole === access.projectRole) {
            setEditError("User " + access.user.name + " " + access.user.surname + " has already selected role");
            return;
          }
          editAccess(new EditAccess(access.user.id, access.project.id, editedRole!)).then((response: any) => {
            if ((response as AxiosResponse).status !== 201) {
              setEditError("Unable to edit user access")
              return;
            }
            setAccesses([...(accesses.filter(a => a.id !== editedId!)), response.data].sort((a, b) => b.id - a.id));
            setEditedId(null);
            setEditedRole(null);
            return;
          });
        }}>
          Save
        </button>
        <button className="btn btn-primary m-2" onClick={() => {
          setEditedId(null);
          setEditedRole(null);
        }}>
          Cancel
        </button>
      </div>
    )
  }

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} selectedProject={projectName}/>
        <div className="d-flex flex-column main-content">
          <h1>Users {projectName}</h1>
          {accesses.filter(a => a.user.id !== loggedUser.id).map(a => displayAccess(a))}
        </div>
      </div>
    </div>
  );
}

export default Users;
