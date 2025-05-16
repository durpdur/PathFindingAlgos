/*
  Node:
  - No States to handle

  - 
*/

import React from "react";

interface NodeProps {
  NodeItem: number;

  onMouseDown?: () => void;
  onMouseEnter?: () => void;
}

const getColor = (itemPlaced : number): string => {
  switch (itemPlaced)
  {
    case 0:
      return "white"; // Empty
    case 1:
      return "black"; // Wall
    case 2:
      return "green"; // start
    case 3:
      return "red"; // end
    default:
      return "grey";
  }
};

const Node: React.FC<NodeProps> = ({ NodeItem, onMouseDown, onMouseEnter }) => {
  // baseStyles
  const baseStyles = {
    width: "49px",
    height: "49px",
    backgroundColor: "pink",
    border: "1px solid black",
    borderRadius: "2px",
    color: "black",
  };

  // dynamic (add or modify)
  const dynamicStyles = {
    ...baseStyles, // copies base styles
    backgroundColor: getColor(NodeItem), // using NodeItem prop
  };

  return (
    <div
      className="node"
      style={dynamicStyles}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    >
      {NodeItem}
    </div>
  );
};

export default Node;
