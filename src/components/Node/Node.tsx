/*
  Node:
  - No States to handle

  - 
*/

import React from "react";
import "./Node.css";

interface NodeProps {
  coord?: string;
  NodeItem: number;

  onMouseDown?: () => void;
  onMouseEnter?: () => void;
}

const getBackgroundColor = (itemPlaced : number): string => {
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
    case 4:
      return "orange"; // discovered nodes by algorithm
    case 5:
      return "yellow"; // shortest path visualization
    default:
      return "grey";
  }
};

const getAnimation = (itemPlaced: number): string | undefined => {
  switch (itemPlaced) {
    case 1:
    case 2:
    case 3:
    case 4:
      return "discoveredIn 0.4s ease forwards"
    case 5:
      return "shortestPathIn 0.4s ease forwards";
    default:
      return undefined;
  }
};

const Node: React.FC<NodeProps> = ({ coord, NodeItem, onMouseDown, onMouseEnter }) => {
  // baseStyles
  const baseStyles = {
    width: "99%",
    height: "99%",
    border: "1px solid grey",
    borderRadius: "2px",
    color: "black",
  };

  // dynamicStyles (changes depending on state)
  const dynamicStyles = {
    ...baseStyles,
    ...(NodeItem === 4 || NodeItem === 5 
      ? { animation: getAnimation(NodeItem) }
      : { backgroundColor: getBackgroundColor(NodeItem) }
    ),
  };


  return (
    <div
      key={coord}
      className={`node`}
      style={dynamicStyles}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
     />
  );
};

export default Node;
