import "../App.css";

function Nav() {
  class PathAndName {
    path: string;
    name: string;

    constructor(path: string, name: string) {
      this.path = path;
      this.name = name;
      return;
    }
  }

  function AnchorForPath(props: PathAndName) {
    if (window.location.pathname === props.path) {
      return (
        <a className="active" href={props.path}>
          {props.name}
        </a>
      );
    }
    return <a href={props.path}>{props.name}</a>;
  }

  return (
    <div className="nav">
      <AnchorForPath path="/" name="Home" />
      <AnchorForPath path="/page1" name="Page1" />
      <AnchorForPath path="/logout" name="Logout" />
    </div>
  );
}

export default Nav;
