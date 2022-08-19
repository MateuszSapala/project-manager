import "../App.css";
import {User} from "../model/user/User";
import {Project} from "../model/project/Project";
import Sidebar from "./Sidebar";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {stateGetUsers} from "../service/UseStateService";
import {displayMessages, loader} from "./Util";
import {confirm} from "react-confirm-box";
import {AxiosResponse} from "axios";
import {addUser, editUser} from "../service/UserService";
import {AddUser} from "../model/user/AddUser";
import {EditUser} from "../model/user/EditUser";
import {Accordion} from "react-bootstrap";
import {
  translateAdd,
  translateAdmin,
  translateAreYouSureAdminRights,
  translateCancel,
  translateEdit,
  translateEmail,
  translateEnterEmail,
  translateEnterName,
  translateEnterPassword,
  translateEnterSurname,
  translateEnterUsername,
  translateName,
  translatePassword,
  translateSave,
  translateSurname,
  translateTheFollowingDataIsMissing, translateUnableToEditUser,
  translateUnableToAddUser,
  translateUnableToEditTask,
  translateUnableToEditUserAccess,
  translateUsername, translateUsers
} from "../service/LanguageService";

interface Props {
  loggedUser: User | null;
  projects: Array<Project> | null;
}

function Users({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  const [users, setUsers] = useState<Array<User> | null>(null);

  useEffect(() => {
    if (loggedUser !== null && loggedUser !== undefined && !loggedUser.admin) {
      window.location.replace(window.location.origin);
    }
    stateGetUsers(users, setUsers);
  }, [loggedUser, projectName, users]);

  const [addUsername, setAddUsername] = useState<string>("");
  const [addPassword, setAddPassword] = useState<string>("");
  const [addEmail, setAddEmail] = useState<string>("");
  const [addName, setAddName] = useState<string>("");
  const [addSurname, setAddSurname] = useState<string>("");
  const [addAdmin, setAddAdmin] = useState<boolean>(false);
  const [addError, setAddError] = useState<string>("");
  const [addSuccess, setAddSuccess] = useState<string>("");

  const [editedId, setEditId] = useState<number>(0);
  const [editUsername, setEditUsername] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editName, setEditName] = useState<string>("");
  const [editSurname, setEditSurname] = useState<string>("");
  const [editAdmin, setEditAdmin] = useState<boolean>(false);
  const [editError, setEditError] = useState<string>("");

  const setEdited = (user?: User, error?: string) => {
    setEditId(user !== undefined ? user.id : 0);
    setEditUsername(user !== undefined ? user.username : "");
    setEditEmail(user !== undefined ? user.email : "");
    setEditName(user !== undefined ? user.name : "");
    setEditSurname(user !== undefined ? user.surname : "");
    setEditAdmin(user !== undefined ? user.admin : false);
    setEditError(error !== undefined ? error : "");
  }

  const isLoading = () => projects === null || users === null || !loggedUser?.admin;

  const displayUser = (user: User) => {
    return (
      <Accordion defaultActiveKey="1" className="accordion-task" key={user.id}>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="m-3">
            <p style={{fontSize: "large"}}>
              {user.name + " " + user.surname}
              <span className="accordion-task-right">
                &#x290B; &#x290A;
              </span>
            </p>
          </Accordion.Header>
          <Accordion.Body>
            {displayEdit(user)}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    )
  }

  const displayEdit = (user: User) => {
    const edited = user.id === editedId;
    return (<div>
      <div className="form-group m-3">
        <label>{translateUsername()}:
          <input type="text" className="form-control text-primary"
                 placeholder={edited ? translateEnterUsername() : user.username} value={edited ? editUsername : ""}
                 onChange={(event => setEditUsername(event.target.value))} disabled={!edited}/>
        </label>
        <label>{translateEmail()}:
          <input type="text" className="form-control text-primary"
                 placeholder={edited ? translateEnterEmail() : user.email} value={edited ? editEmail : ""}
                 onChange={(event => setEditEmail(event.target.value))} disabled={!edited}/>
        </label>
        <label>{translateName()}:
          <input type="text" className="form-control text-primary"
                 placeholder={edited ? translateName() : user.name} value={edited ? editName : ""}
                 onChange={(event => setEditName(event.target.value))} disabled={!edited}/>
        </label>
        <label>{translateSurname()}:
          <input type="text" className="form-control text-primary"
                 placeholder={edited ? translateEnterSurname() : user.surname} value={edited ? editSurname : ""}
                 onChange={event => setEditSurname(event.target.value)} disabled={!edited}/>
        </label>
        <label>
          <input type="checkbox" checked={edited ? editAdmin : user.admin} disabled={!edited}
                 onChange={async () => {
                   if (editAdmin) {
                     setEditAdmin(!editAdmin);
                     return;
                   }
                   const result = await confirm(translateAreYouSureAdminRights());
                   if (!result) {
                     console.log("Cancelled");
                     return;
                   }
                   setEditAdmin(!editAdmin)
                 }}/> {translateAdmin()}
        </label>
        {edited ? displayMessages(editError) : ""}
        {!edited ?
          <div className="accordion-buttons-container">
            <button className="btn btn-primary btn-block"
                    onClick={() => setEdited(user)}>{translateEdit()}
            </button>
          </div> : ""}
        {edited ?
          <div className="accordion-buttons-container">
            <div className="two-buttons float-left">
              <button className="btn btn-primary btn-block" onClick={handleEditUser}>
                {translateSave()}
              </button>
            </div>
            <div className="two-buttons float-right">
              <button className="btn btn-primary btn-block" onClick={() => setEdited()}>
                {translateCancel()}
              </button>
            </div>
          </div>
          : ""}
      </div>
    </div>)
  }

  const handleEditUser = () => {
    setEditError("");
    const missing = [];
    if (editUsername === "") missing.push(translateUsername());
    if (editEmail === "") missing.push(translateEnterEmail());
    if (editName === "") missing.push(translateName());
    if (editSurname === "") missing.push(translateSurname());
    if (missing.length > 0) {
      setEditError(translateTheFollowingDataIsMissing(missing));
      return;
    }

    const user = users?.filter(u => u.id === editedId)[0];
    const editedFields: Array<string> = [];
    if (editUsername !== user?.username) editedFields.push("username");
    if (editEmail !== user?.email) editedFields.push("email");
    if (editName !== user?.name) editedFields.push("name");
    if (editSurname !== user?.surname) editedFields.push("surname");
    if (editAdmin !== user?.admin) editedFields.push("admin");
    if (editedFields.length === 0) {
      setEdited();
      return;
    }

    editUser(editedId, new EditUser(editedFields, editUsername, editEmail, editName, editSurname, editAdmin)).then((response) => {
      const resp = response as AxiosResponse;
      if (resp.status !== 200) {
        console.log("Unable to edit user");
        setEditError(translateUnableToEditUser());
        return;
      }
      if (users === null) return;
      setUsers([...(users.filter(u => u.id !== editedId)), response.data].sort((a, b) => a.id - b.id));
      setEdited();
    });
  }

  const displayAdd = () => {
    return (<div>
      <div className="form-group">
        <label>{translateUsername()}:
          <input type="text" className="form-control text-primary" placeholder={translateEnterUsername()} value={addUsername}
                 onChange={(event => setAddUsername(event.target.value))}/>
        </label>
        <label>{translatePassword()}:
          <input type="password" className="form-control text-primary" placeholder={translateEnterPassword()} value={addPassword}
                 onChange={(event => setAddPassword(event.target.value))}/>
        </label>
        <label>{translateEmail()}:
          <input type="text" className="form-control text-primary" placeholder={translateEnterEmail()} value={addEmail}
                 onChange={(event => setAddEmail(event.target.value))}/>
        </label>
        <label>{translateName()}:
          <input type="text" className="form-control text-primary" placeholder={translateEnterName()} value={addName}
                 onChange={(event => setAddName(event.target.value))}/>
        </label>
        <label>{translateSurname()}:
          <input type="text" className="form-control text-primary" placeholder={translateEnterSurname()} value={addSurname}
                 onChange={event => setAddSurname(event.target.value)}/>
        </label>
        <label>
          <input type="checkbox" checked={addAdmin}
                 onChange={async () => {
                   if (addAdmin) {
                     setAddAdmin(!addAdmin);
                     return;
                   }
                   const result = await confirm(translateAreYouSureAdminRights());
                   if (!result) {
                     console.log("Cancelled");
                     return;
                   }
                   setAddAdmin(!addAdmin)
                 }}/> {translateAdmin()}
        </label>
        {displayMessages(addError, addSuccess)}
        <button className="btn btn-primary btn-block" onClick={handleAddUser}>{translateAdd()}</button>
      </div>
    </div>)
  }

  const handleAddUser = () => {
    setAddError("");
    setAddSuccess("");
    const missing = [];
    if (addUsername === "") missing.push(translateUsername());
    if (addPassword === "") missing.push(translatePassword());
    if (addEmail === "") missing.push(translateEmail());
    if (addName === "") missing.push(translateName());
    if (addSurname === "") missing.push(translateSurname());
    if (missing.length > 0) {
      setAddError(translateTheFollowingDataIsMissing(missing));
      return;
    }

    addUser(new AddUser(addUsername, addPassword, addEmail, addName, addSurname, addAdmin)).then((response) => {
      const resp = response as AxiosResponse;
      if (resp.status !== 201) {
        console.log("Unable to add user");
        setAddError(translateUnableToAddUser);
        return;
      }
      setAddSuccess("Successfully added user")
      if (users === null) return;
      setUsers([...users, response.data]);
    });
  }

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} loggedUser={loggedUser}/>
        <div className="d-flex flex-column main-content">
          <div className="m-2">
            <h1>{translateUsers()}</h1>
            {isLoading() && loader()}
            {!isLoading() && users?.map(u => displayUser(u))}
            {!isLoading() && displayAdd()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
