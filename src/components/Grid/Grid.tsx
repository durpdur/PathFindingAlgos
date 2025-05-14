/* 
Grid:
Args
- boxStates
*/

import React from "react";

import Node from "../Node";

// Props
interface GridProps {
  boxStates: boolean[][];
  togglesStates: (i: number, j: number) => void;
}

// return
const Grid: React.FC<GridProps> = ({ boxStates, togglesStates }) => {
  return (
    <div className="grid">
      {boxStates.map((row, i) =>
        row.map((state, j) => (
          <Node
            key={`${i}-${j}`}
            pinkWhite={state}
            onClick={() => togglesStates(i, j)}
            i={i}
            j={j}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
