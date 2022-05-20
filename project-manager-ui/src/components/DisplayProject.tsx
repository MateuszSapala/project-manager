import { useParams } from "react-router-dom";
import "../App.css";

function DisplayProject() {
  let { projectName } = useParams();
  return (
    <div>
      <h1>Project {projectName}</h1>
    </div>
  );
}

export default DisplayProject;
