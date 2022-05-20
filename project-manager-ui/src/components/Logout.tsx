import "../index.css";
import "../App.css";

function Logout() {
  window.localStorage.removeItem("authorization");
  window.location.href = "/login";
  return <div className="App"></div>;
}

export default Logout;
