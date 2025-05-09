import React from "react";

import Node from "../Node";

// Props
interface GridProps {
  boxStates: boolean[][];
  selectionType: "click" | "click-and-drag";

  togglesStates: (i: number, j: number) => void;
}

// return
const Grid: React.FC<GridProps> = ({
  boxStates,
  togglesStates,
  // selectionType
}) => {
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
