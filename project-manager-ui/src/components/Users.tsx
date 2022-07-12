import "../App.css";
import {User} from "../model/user/User";
import {Project} from "../model/project/Project";
import Sidebar from "./Sidebar";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {stateGetUsers} from "../service/UseStateService";
import {displayMessages, loader} from "./Util";
import {confirm} from "react-confirm-box";
import {AxiosResponse} from "axios";
import {addUser, editUser} from "../service/UserService";
import {AddUser} from "../model/user/AddUser";
import {EditUser} from "../model/user/EditUser";
import {Accordion} from "react-bootstrap";

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
            <p style={{fontSize: "large"}}>{user.name + " " + user.surname}</p>
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
        <label>Username:
          <input type="text" className="form-control text-primary"
                 placeholder={edited ? "Enter username" : user.username} value={edited ? editUsername : ""}
                 onChange={(event => setEditUsername(event.target.value))} disabled={!edited}/>
        </label>
        <label>Email:
          <input type="text" className="form-control text-primary"
                 placeholder={edited ? "Enter email" : user.email} value={edited ? editEmail : ""}
                 onChange={(event => setEditEmail(event.target.value))} disabled={!edited}/>
        </label>
        <label>Name:
          <input type="text" className="form-control text-primary"
                 placeholder={edited ? "Enter name" : user.name} value={edited ? editName : ""}
                 onChange={(event => setEditName(event.target.value))} disabled={!edited}/>
        </label>
        <label>Surname:
          <input type="text" className="form-control text-primary"
                 placeholder={edited ? "Enter surname" : user.surname} value={edited ? editSurname : ""}
                 onChange={event => setEditSurname(event.target.value)} disabled={!edited}/>
        </label>
        <label>
          <input type="checkbox" checked={edited ? editAdmin : user.admin} disabled={!edited}
                 onChange={async () => {
                   if (editAdmin) {
                     setEditAdmin(!editAdmin);
                     return;
                   }
                   const result = await confirm("Are you sure you want to add admin rights for this user?");
                   if (!result) {
                     console.log("Cancelled");
                     return;
                   }
                   setEditAdmin(!editAdmin)
                 }}/> admin
        </label>
        {edited ? displayMessages(editError) : ""}
        {!edited ?
          <div className="accordion-buttons-container">
            <button className="btn btn-primary btn-block"
                    onClick={() => setEdited(user)}>Edit
            </button>
          </div> : ""}
        {edited ?
          <div className="accordion-buttons-container">
            <div className="two-buttons float-left">
              <button className="btn btn-primary btn-block" onClick={handleEditUser}>
                Save
              </button>
            </div>
            <div className="two-buttons float-right">
              <button className="btn btn-primary btn-block" onClick={() => setEdited()}>
                Cancel
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
    if (editUsername === "") missing.push("username");
    if (editEmail === "") missing.push("email");
    if (editName === "") missing.push("name");
    if (editSurname === "") missing.push("surname");
    if (missing.length > 0) {
      setEditError("Following fields are missing: " + missing.toString().replaceAll(",", ", "));
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
        setEditError("Unable to add user");
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
        <label>Username:
          <input type="text" className="form-control text-primary" placeholder="Enter username" value={addUsername}
                 onChange={(event => setAddUsername(event.target.value))}/>
        </label>
        <label>Password:
          <input type="password" className="form-control text-primary" placeholder="Enter password" value={addPassword}
                 onChange={(event => setAddPassword(event.target.value))}/>
        </label>
        <label>Email:
          <input type="text" className="form-control text-primary" placeholder="Enter email" value={addEmail}
                 onChange={(event => setAddEmail(event.target.value))}/>
        </label>
        <label>Name:
          <input type="text" className="form-control text-primary" placeholder="Enter name" value={addName}
                 onChange={(event => setAddName(event.target.value))}/>
        </label>
        <label>Surname:
          <input type="text" className="form-control text-primary" placeholder="Enter surname" value={addSurname}
                 onChange={event => setAddSurname(event.target.value)}/>
        </label>
        <label>
          <input type="checkbox" checked={addAdmin}
                 onChange={async () => {
                   if (addAdmin) {
                     setAddAdmin(!addAdmin);
                     return;
                   }
                   const result = await confirm("Are you sure you want to add admin rights for this user?");
                   if (!result) {
                     console.log("Cancelled");
                     return;
                   }
                   setAddAdmin(!addAdmin)
                 }}/> admin
        </label>
        {displayMessages(addError, addSuccess)}
        <button className="btn btn-primary btn-block" onClick={handleAddUser}>Add</button>
      </div>
    </div>)
  }

  const handleAddUser = () => {
    setAddError("");
    setAddSuccess("");
    const missing = [];
    if (addUsername === "") missing.push("username");
    if (addPassword === "") missing.push("password");
    if (addEmail === "") missing.push("email");
    if (addName === "") missing.push("name");
    if (addSurname === "") missing.push("surname");
    if (missing.length > 0) {
      setAddError("Following fields are missing: " + missing.toString().replaceAll(",", ", "));
      return;
    }

    addUser(new AddUser(addUsername, addPassword, addEmail, addName, addSurname, addAdmin)).then((response) => {
      const resp = response as AxiosResponse;
      if (resp.status !== 201) {
        console.log("Unable to add user");
        setAddError("Unable to add user");
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
            <h1>Users</h1>
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
