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
import {deleteAccess, editAccess} from "../service/AccessService";
import {EditAccess} from "../model/access/EditAccess";
import {confirm} from "react-confirm-box";

interface Props {
  loggedUser: User;
  projects: Array<Project>;
}

function Accesses({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [accesses, setAccesses] = useState<Array<Access>>([]);
  const [users, setUsers] = useState<Array<User>>([]);

  const [editedId, setEditedId] = useState<number | null>(null);
  const [editedRole, setEditedRole] = useState<ProjectRole | null>(null);
  const [editError, setEditError] = useState<string>("");

  const [addUser, setAddUser] = useState<User | undefined>(undefined);
  const [addRole, setAddRole] = useState<ProjectRole | null>(null);
  const [addError, setAddError] = useState<string>("");

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
          <p className="card-text">Role: {projectRoleToString(access?.projectRole)}</p>
          {access.id === editedId ? displayCheckboxes(editedRole, setEditedRole) : ""}
          {displayMessages(editError)}
          {displayButtons(access)}
        </div>
      </div>
    )
  }

  const displayCheckboxes = (role: ProjectRole | null, setRole: Dispatch<ProjectRole | null>) => {
    return (
      <div>
        {ProjectRoleTable.map(r => <div className="checkbox d-inline mr-3" key={r}>
          <input type="checkbox" checked={role === r}
                 onChange={() => setRole(r)}/>{" " + projectRoleToString(r)}
        </div>)}
      </div>
    )
  }

  const displayButtons = (access: Access) => {
    if (access.id !== editedId) {
      return (<div>
        <button className="btn btn-primary m-2" onClick={() => {
          setEditedId(access.id);
          setEditedRole(null);
        }}>Edit
        </button>
        <button className="btn btn-primary m-2" onClick={async () => {
          const result = await confirm("Are you sure you want to revoke " + access.user.name + " " + access.user.surname + "'s access?");
          if (!result) {
            console.log("Cancelled");
            return;
          }
          deleteAccess(access.id).then((response) => {
            const resp = response as AxiosResponse;
            if (resp.status !== 200) {
              console.log("Unable to delete access");
              return;
            }
            setAccesses(accesses.filter(a => a.id !== access.id))
          });
        }}>Delete
        </button>
      </div>)
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

  const displayAdd = () => {
    return (
      <div>
        {displayUserSelect()}
        {displayCheckboxes(addRole, setAddRole)}
        {displayMessages(addError)}
        <button className="btn btn-primary m-2" onClick={() => {
          if (addUser === undefined) {
            setAddError("User not selected");
            return;
          }
          if (addRole === null) {
            setAddError("Role not selected");
            return;
          }
          editAccess(new EditAccess(addUser.id, project!.id, addRole!)).then((response: any) => {
            if ((response as AxiosResponse).status !== 201) {
              setAddError("Unable to add user access")
              return;
            }
            setAccesses([...accesses, response.data]);
            setAddRole(null);
            setAddUser(undefined);
            setAddError("");
            return;
          });
        }}>
          Save
        </button>
      </div>
    )
  }

  const displayUserSelect = () => {
    return (
      <label htmlFor="addUser">
        User:
        <select className={addUser === undefined ? "form-control" : "form-control text-primary"} id="addUser"
                value={addUser?.id}
                onChange={event => {
                  console.log(event)
                  console.log(event.target.value)
                  setAddUser(users.find(user => user.id.toString() === event.target.value))
                }}>
          <option value={undefined}>Select user</option>
          {users.filter(user => accesses.filter(a => a.user.id === user.id).length === 0).map(user => {
            return (<option className="text-primary" value={user.id} key={user.id}>
              {user.name + " " + user.surname}
            </option>)
          })}
        </select>
      </label>
    )
  }

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} selectedProject={projectName}/>
        <div className="d-flex flex-column main-content">
          <div className="m-2">
            <h1>Accesses {projectName}</h1>
            {accesses.filter(a => a.user.id !== loggedUser.id).map(a => displayAccess(a))}
            {displayAdd()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accesses;
