/* 
Grid:
Args
- boxStates
*/

import React, { useEffect, useState } from "react";

import Node from "../Node";

// Props
interface GridProps {
  boxStates: boolean[][];
  togglesStates: (i: number, j: number) => void;
  selectionType: "click" | "click-and-drag";
}

// return
const Grid: React.FC<GridProps> = ({
  boxStates,
  togglesStates,
  selectionType,
}) => {
  // useState
  const [isDragging, setIsDragging] = useState(false);

  // mouse listeners
  const handleMouseDown = (i: number, j: number) => {
    togglesStates(i, j); // click
    if (selectionType === "click-and-drag") {
      setIsDragging(true); // update to dragging
    }
  };

  const handleMouseEnter = (i: number, j: number) => {
    // toggle boxes entered while dragging
    if (isDragging && selectionType === "click-and-drag") {
      togglesStates(i, j);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false); // no longer dragging
  };

  // useEffect
  // Ends dragging when mouse is released even outside of screen
  useEffect(() => {
    // window lister for if mouse comes up
    window.addEventListener("mouseup", handleMouseUp); 
    // Cleanup for when Grid.tsx unmounts (currently never happens)
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div className="grid">
      {boxStates.map((row, i) =>
        row.map((state, j) => (
          <Node
            key={`${i}-${j}`}
            pinkWhite={state}
            onMouseDown={() => handleMouseDown(i, j)}
            onMouseEnter={() => handleMouseEnter(i, j)}
            i={i}
            j={j}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
