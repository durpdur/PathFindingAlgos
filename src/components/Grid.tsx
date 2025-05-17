/* 
Grid:
Args
- boxStates
*/

import React, { useEffect, useState } from "react";

import Node from "./Node";

// Props
interface GridProps {
  boxStates: number[][];
  togglesStates: (i: number, j: number, itemSelected: number) => void;
  selectionType: boolean;
  itemSelected: number;
}

const Grid: React.FC<GridProps> = ({
  boxStates,
  togglesStates,
  selectionType,
  itemSelected,
}) => {
  // STATES
  const [isDragging, setIsDragging] = useState(false);

  // mouse listeners
  const handleMouseDown = (i: number, j: number, itemSelected: number) => {
    togglesStates(i, j, itemSelected); // click
    if (selectionType) {
      setIsDragging(true); // update to dragging
    }
  };

  const handleMouseEnter = (i: number, j: number, itemSelected: number) => {
    // toggle boxes entered while dragging
    if (isDragging && selectionType) {
      togglesStates(i, j, itemSelected);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false); // no longer dragging
  };

  // useEffect
  // Ends dragging when mouse is released even outside of screen
  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);

    // Cleanup for when Grid.tsx unmounts (currently never happens)
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div
      className="grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(var(--grid-cols), 50px)",
        gridTemplateRows: "repeat(var(--grid-rows), 50px)",
        // overflow: "none", // forgot what this does
        userSelect: "none",
        border: "2px",
        borderRadius: "20px",
      }}
    >
      {boxStates.map((row, i) =>
        row.map((state, j) => (
          <Node
            key={`${i}-${j}`}
            coord={`${i}-${j}`}
            NodeItem={state}
            onMouseDown={() => handleMouseDown(i, j, itemSelected)}
            onMouseEnter={() => handleMouseEnter(i, j, itemSelected)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
