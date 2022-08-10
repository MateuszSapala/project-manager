import {useParams} from "react-router-dom";
import "../App.css";
import {Project} from "../model/project/Project";
import {User} from "../model/user/User";
import Sidebar from "./Sidebar";
import {Dispatch, useEffect, useState} from "react";
import {Access} from "../model/access/Access";
import {
  stateGetAccessesByProject,
  stateGetEntitlements,
  stateGetProject,
  stateGetUsers
} from "../service/UseStateService";
import {ProjectRole, ProjectRoleTable, projectRoleToString} from "../model/access/ProjectRole";
import {displayMessages, loader} from "./Util";
import {AxiosResponse} from "axios";
import {deleteAccess, editAccess} from "../service/AccessService";
import {EditAccess} from "../model/access/EditAccess";
import {confirm} from "react-confirm-box";
import {Entitlements} from "../model/access/Entitlements";
import {
  translateAccessesProjectName, translateCancel,
  translateDelete, translateEdit,
  translateEmail,
  translateRevokeAccess,
  translateRole,
  translateRoleNotSelected, translateSave,
  translateSelectUser,
  translateUnableToAddUserAccess,
  translateUnableToEditUserAccess, translateUser,
  translateUserHasAlreadyRole,
  translateUserNotSelected
} from "../service/LanguageService";

interface Props {
  loggedUser: User | null;
  projects: Array<Project> | null;
}

function Accesses({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [accesses, setAccesses] = useState<Array<Access> | null>(null);
  const [users, setUsers] = useState<Array<User> | null>(null);
  const [entitlements, setEntitlements] = useState<Entitlements | undefined>(undefined);

  const [editedId, setEditedId] = useState<number | null>(null);
  const [editedRole, setEditedRole] = useState<ProjectRole | null>(null);
  const [editError, setEditError] = useState<string>("");

  const [addUser, setAddUser] = useState<User | undefined>(undefined);
  const [addRole, setAddRole] = useState<ProjectRole | null>(null);
  const [addError, setAddError] = useState<string>("");

  useEffect(() => {
    stateGetProject(projectName, project, setProject);
  }, [project, projectName]);
  useEffect(() => {
    stateGetAccessesByProject(project?.id, accesses, setAccesses);
  }, [accesses, project]);
  useEffect(() => {
    stateGetUsers(users, setUsers);
  }, [project, users]);
  useEffect(() => {
    if (entitlements !== undefined && !entitlements.accessViewing) {
      window.location.replace(window.location.origin + "/projects/" + projectName);
    }
    stateGetEntitlements(project?.id, entitlements, setEntitlements);
  }, [entitlements, project, projectName]);

  const isLoading = () => accesses === null || entitlements === null || project === null || projectName === null || users === null;

  const displayAccess = (access: Access) => {
    return (
      <div className="card card-user" key={access.user.id}>
        <div className="card-body">
          <h5 className="card-title">{access.user.name + " " + access.user.surname}</h5>
          <p className="card-text">{translateEmail()}: {access.user.email}</p>
          <p className="card-text">{translateRole()}: {projectRoleToString(access?.projectRole)}</p>
          {access.id === editedId && displayCheckboxes(editedRole, setEditedRole)}
          {access.id === editedId && displayMessages(editError)}
          {loggedUser?.admin && displayButtons(access)}
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
        }}>{translateEdit()}
        </button>
        <button className="btn btn-primary m-2" onClick={async () => {
          const result = await confirm(translateRevokeAccess(access.user.name, access.user.surname));
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
            if (accesses === null) return;
            setAccesses(accesses.filter(a => a.id !== access.id))
          });
        }}>{translateDelete()}
        </button>
      </div>)
    }
    return (
      <div>
        <button className="btn btn-primary m-2" onClick={() => {
          if (editedRole === null) {
            setEditError(translateRoleNotSelected());
            return;
          }
          if (accesses === null) return;
          const access = accesses.filter(a => a.id === editedId)[0];
          if (editedRole === access.projectRole) {
            setEditError(translateUserHasAlreadyRole(access.user.name, access.user.surname));
            return;
          }
          editAccess(new EditAccess(access.user.id, access.project.id, editedRole!)).then((response: any) => {
            if ((response as AxiosResponse).status !== 201) {
              setEditError(translateUnableToEditUserAccess())
              return;
            }
            setAccesses([...(accesses.filter(a => a.id !== editedId!)), response.data].sort((a, b) => b.id - a.id));
            setEditedId(null);
            setEditedRole(null);
            return;
          });
        }}>
          {translateSave()}
        </button>
        <button className="btn btn-primary m-2" onClick={() => {
          setEditedId(null);
          setEditedRole(null);
        }}>
          {translateCancel()}
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
            setAddError(translateUserNotSelected());
            return;
          }
          if (addRole === null) {
            setAddError(translateRoleNotSelected());
            return;
          }
          editAccess(new EditAccess(addUser.id, project!.id, addRole!)).then((response: any) => {
            if ((response as AxiosResponse).status !== 201) {
              setAddError(translateUnableToAddUserAccess())
              return;
            }
            if (accesses === null) return;
            setAccesses([...accesses, response.data]);
            setAddRole(null);
            setAddUser(undefined);
            setAddError("");
            return;
          });
        }}>
          {translateSave()}
        </button>
      </div>
    )
  }

  const displayUserSelect = () => {
    return (
      <label htmlFor="addUser">
        {translateUser()}:
        <select className={addUser === undefined ? "form-control" : "form-control text-primary"} id="addUser"
                value={addUser?.id}
                onChange={event => {
                  if (users === null) return;
                  setAddUser(users.find(user => user.id.toString() === event.target.value))
                }}>
          <option value={undefined}>{translateSelectUser()}</option>
          {
            users !== null && accesses !== null ? users.filter(user => accesses.filter(a => a.user.id === user.id).length === 0).map(user => {
              return (<option className="text-primary" value={user.id} key={user.id}>
                {user.name + " " + user.surname}
              </option>)
            }) : ""}
        </select>
      </label>
    )
  }

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} selectedProject={projectName} loggedUser={loggedUser}
                 entitlements={entitlements}/>
        <div className="d-flex flex-column main-content">
          <div className="m-2">
            <h1>{translateAccessesProjectName(projectName ? projectName : "")}</h1>
            {isLoading() && loader()}
            {!isLoading() && accesses !== null && loggedUser !== null && accesses.filter(a => a.user.id !== loggedUser.id).map(a => displayAccess(a))}
            {!isLoading() && loggedUser?.admin && displayAdd()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accesses;
