/* 
Toolbar
- Algorithm Selector (dropdown)
- Maze Generator (dropdown)
- Wall Placer (click & drag)
- Reset Grid
- Reset Obstacles
- Start (click)
- End (click)
- Speed Adjustment
- Timeline
  - e.g. showing steps from __ to __

*/
import React from "react";

interface ToolbarProps {
  itemPlacement: number;
  setItemPlacement: (item: number) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  itemPlacement,
  setItemPlacement,
}) => {
  const selectedValue = itemPlacement;

  // rendering
  return (
    <div
      className="Toolbar"
      style={{ display: "flex", gap: "8px", padding: "8px" }}
    >
      {Array.from({ length: 10 }, (_, i) => {
        const number = i + 1;
        const isSelected = selectedValue === number;

        return (
          <div
            key={number}
            onClick={() => setItemPlacement(number)}
            style={{
              width: "30px",
              height: "30px",
              textAlign: "center",
              padding: "8px",
              backgroundColor: isSelected? "pink" : "white",
              color: isSelected ? "purple" : "pink",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              userSelect: "none"
            }}
          >{number}</div>
        );
      })}
    </div>
  );
};

export default Toolbar;
