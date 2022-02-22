import React, { SyntheticEvent } from 'react';
import '../index.css'
import '../App.css';
import { useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios';
import Credentials from "../model/Credentials"
import { sendLogin } from "../service/Sender"
import Message from '../model/Message';

function Login(props: Message) {
  let navigate = useNavigate();

  function getCredentials(): Credentials {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const credentials: Credentials = new Credentials(username, password);
    return credentials;
  };

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const response = await sendLogin(getCredentials());
    if (response === false) {
      props = new Message("Wrong username or password given");
      return;
    }
    if ((response as AxiosResponse).status !== 200) {
      props = new Message("Wrong username or password given");
    }
    window.localStorage.setItem("authorization", (response as AxiosResponse).headers["authorization"]);
    navigate("/");
    return;

  }


  return (
    <div className="App">
      <form action="/main">
        <p>
          <label htmlFor="username">Enter a Username:{" "}
            <input id="username" type="text" placeholder="username" name="username"></input>
          </label>
        </p>
        <p>
          <label htmlFor="password">Enter Password:{" "}
            <input id="password" type="password" placeholder="password" name="password"></input>
          </label>
        </p>
        <button className="button" onClick={handleSubmit}>Login</button>
        <button className="button" type="reset">Cancel</button>
      </form>
      <p>{props.message}</p>
    </div>
  );
}

export default Login;
