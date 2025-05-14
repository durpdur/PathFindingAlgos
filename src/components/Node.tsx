/*
  Grid:
    - No States to handle
*/

import React from "react";

interface NodeProps {
  pinkWhite: boolean; // property for use later
  i: number;
  j: number;

  onClick?: () => void; //
}

const Node: React.FC<NodeProps> = ({ pinkWhite, onClick, i, j }) => {
  // baseStyles
  const baseStyles = {
    width: "50px",
    height: "50px",
    backgroundColor: "pink",
    border: "1px solid black",
    borderRadius: "5px",
    color: "black",
  };

  // dynamic (add or modify)
  const dynamicStyles = {
    ...baseStyles, // copies base styles
    backgroundColor: pinkWhite ? "pink" : "white", // using pinkWhite prop
  };

  return (
    <div
      className="node"
      style={dynamicStyles}
      onClick={onClick}
    >{`${i}-${j}`}</div>
  );
};

export default Node;
