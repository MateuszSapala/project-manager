import React, {Fragment, useRef, useState} from "react";
import {DragSourceMonitor, useDrag, useDrop} from "react-dnd";
import Window from "./Window";
import ITEM_TYPE from "../../model/task/Types";
import {Task} from "../../model/task/Task";
import {translateUnassigned} from "../../service/LanguageService";

interface Props {
  item: Task;
  index: any;
  moveItem: any;
  status: any;
}

const Item = ({item, index, moveItem, status}: Props) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      // @ts-ignore
      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY =
        mousePosition !== null ? mousePosition.y - hoveredRect.top : 0;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [isDragging, drag] = useDrag({
    item: {type: ITEM_TYPE, ...item, index},
    type: ITEM_TYPE,
    collect: (monitor: DragSourceMonitor) => {
      return monitor.isDragging();
    },
  });

  const [show, setShow] = useState(false);

  const onOpen = () => setShow(true);

  const onClose = () => setShow(false);

  drag(drop(ref));

  return (
    <Fragment>
      <div
        ref={ref}
        style={{opacity: isDragging ? 0 : 1}}
        className={"item"}
        onClick={onOpen}
      >
        <div
          className={"color-bar"}
          style={{backgroundColor: status.color}}
        />
        <p className={"item-title"}>{item.name}</p>
        <p
          className={"item-status"}>{item.assignedTo ? `${item.assignedTo.name} ${item.assignedTo.surname}` : translateUnassigned()}</p>
      </div>
      <Window item={item} onClose={onClose} show={show}/>
    </Fragment>
  );
};

export default Item;
