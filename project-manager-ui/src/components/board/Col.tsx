import React from "react";

interface Props {
  isOver: any;
  children: any;
}

const Col = ({isOver, children}: Props) => {
  const className = isOver ? " highlight-region" : "";

  return <div className={`col${className}`}>{children}</div>;
};

export default Col;
