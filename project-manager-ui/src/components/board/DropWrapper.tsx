import React from "react";
import {useDrop} from "react-dnd";
import {TaskState} from "../../model/task/TaskState";
import ITEM_TYPE from "../../model/task/Types";

interface Props {
  onDrop: (task: any, monitor: any, status: TaskState) => void;
  children: any;
  status: TaskState;
}

const DropWrapper = ({onDrop, children, status}: Props) => {
  const [props, drop] = useDrop<any, any, any>(({
    accept: ITEM_TYPE,
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
    },
  }));

  return (
    <div ref={drop} className={"drop-wrapper"}>
      {React.cloneElement(children, props)}
    </div>
  );
};

export default DropWrapper;
