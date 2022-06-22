import React from "react";
import {Modal} from "react-bootstrap";
import {Task} from "../../model/task/Task";

interface Props {
  show: any;
  onClose: any;
  item: Task;
}

const Window = ({show, onClose, item}: Props) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={"modal"}
      overlayClassName={"overlay"}
    >
      <div className={"close-btn-ctn"}>
        <h1 style={{flex: "1 90%"}}>{item.name}</h1>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
      <div>
        <h2>Description</h2>
        <p>{item.description}</p>
        <h2>Status</h2>
        <p>{item.taskState}</p>
      </div>
    </Modal>
  );
};

export default Window;
