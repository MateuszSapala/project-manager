import '../index.css'
import '../App.css';

function Logout() {
  console.log(1);

  window.localStorage.removeItem("authorization");
  console.log(2);
  window.location.href = "/login";
  console.log(3);

  return (
    <div className="App">
    </div>
  );
}

export default Logout;
