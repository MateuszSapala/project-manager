import React from 'react';
import './App.css';
import Login from './components/Login'
import Main from './components/Main'
import Page1 from './components/page1'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { sendVerify } from './service/Sender';
import { AxiosResponse } from 'axios';
import Logout from './components/Logout';

function App() {
  let navigate = useNavigate();
  //todo
  // verify();


  async function verify() {
    const auth: string = window.localStorage.getItem("authorization") as string
    console.log(auth);
    if (!auth) {
      navigate("/login");
    }
    const response = await sendVerify(window.localStorage.getItem("authorization") as string);
    console.log(response)
    if (window.location.pathname === "/login") {
      navigate("/");
    }
    if (response === false || (response as AxiosResponse).status !== 200) {
      navigate("/login");
    }
  }

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login message="" />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/" element={<Main />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
