import React, { useEffect, useState } from "react";
import "./css/sb-admin-2.min.css";
import "./css/sb-admin-2.css";
import "./App.css";
import Login from "./components/Login";
import Main from "./components/Main";
import Page1 from "./components/page1";
import { Route, Routes, useNavigate } from "react-router-dom";
import { sendVerify } from "./service/Login";
import Logout from "./components/Logout";
import { User } from "./model/User";
// import Footer from "./components/Footer";
// import Sidebar from "./components/Sidebar";

function App() {
  // const [loaddingUser, setLoaddingUser] = useState<Boolean>(false);
  const [loggedUser, setloggedUser] = useState<User | null>(null);

  let navigate = useNavigate();
  useEffect(() => {
    if (loggedUser !== null) {
      console.log(loggedUser);
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
    sendVerify(window.localStorage.getItem("authorization") as string).then(
      (response) => {
        console.log(response);
        if (window.location.pathname === "/login") {
          navigate("/");
        }
        if (response.status === 403) {
          navigate("/login");
        }
        setloggedUser(response.data);
        // setLoaddingUser(false);
      }
    );
  });

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login message="" />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/" element={<Main loggedUser={loggedUser!}></Main>} />
        {/* <Route
          path="/"
          element={
            <div id="page-top">
              <div id="wrapper">
                <Sidebar />
                <p style={{ backgroundColor: "black" }}>dasdas</p>
                <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                    <div className="container-fluid">
                      <h1 className="h3 mb-4 text-gray-800">Blank Page</h1>
                    </div>
                  </div>
                  <Footer />
                </div>
              </div>
              <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
              </a>
            </div>
          }
        /> */}
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
