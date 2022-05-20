import React, { SyntheticEvent } from "react";
import "../index.css";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import Credentials from "../model/Credentials";
import { sendLogin } from "../service/Login";
import Message from "../model/Message";

function Login(props: Message) {
  let navigate = useNavigate();

  function getCredentials(): Credentials {
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const credentials: Credentials = new Credentials(username, password);
    return credentials;
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    sendLogin(getCredentials()).then((response) => {
      if ((response as AxiosResponse).status !== 200) {
        props = new Message("Wrong username or password given");
      }
      window.localStorage.setItem(
        "authorization",
        (response as AxiosResponse).headers["authorization"]
      );
      navigate("/");
      return;
    });
  }

  return (
    <div className="bg-gradient-primary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  {/* Content */}
                  {/* <div className="col-lg-6 d-none d-lg-block bg-login-image"></div> */}
                  <div className="col-lg-12">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">
                          Witaj ponownie!
                        </h1>
                      </div>
                      <form className="user">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="username"
                            aria-describedby="emailHelp"
                            placeholder="Login"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="password"
                            placeholder="Hasło"
                          />
                        </div>
                        {/* <div className="form-group">
                                            <div className="custom-control custom-checkbox small">
                                                <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                                <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                            </div>
                                        </div> */}
                        <button
                          className="btn btn-primary btn-user btn-block"
                          onClick={handleSubmit}
                        >
                          Login
                        </button>
                      </form>
                      {/* <hr/> */}
                      {/* <div className="text-center"><a className="small" href="forgot-password.html">Zapomniałeś hasła?</a></div> */}
                      {/* <div className="text-center"><a className="small" href="register.html">Create an Account!</a></div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
