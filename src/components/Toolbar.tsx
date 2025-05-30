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
  resetStartEnd: () => void;
  resetWall: () => void;
  resetAll: () => void;
  visualizeAlgo: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  itemPlacement,
  setItemPlacement,
  resetStartEnd,
  resetWall,
  resetAll,
  visualizeAlgo,
}) => {
  const selectedValue = itemPlacement;

  // rendering
  return (
    <div
      className="Toolbar"
      style={{ display: "", gap: "1px", padding: "8px" }}
    >
      <div
        className="ToolbarItems"
        style={{ display: "flex", gap: "8px", padding: "8px" }}
      >
        {Array.from({ length: 10 }, (_, i) => {
          const number = i + 1;
          const isSelected = selectedValue === number;

          let toolBarLabel = "";
          switch (number) {
            case 1:
              toolBarLabel = "Wall";
              break;
            case 2:
              toolBarLabel = "Start";
              break;
            case 3:
              toolBarLabel = "End";
              break;
            default:
              toolBarLabel = number.toString();
              break;
          }

          return (
            <div
              key={number}
              onClick={() => setItemPlacement(number)}
              className={`toolbar-button ${isSelected ? "selected" : ""}`}
            >
              {toolBarLabel}
            </div>
          );
        })}
        <div
          className="ToolbarResetStartEndButton toolbar-button"
          onClick={resetStartEnd}
        >
          Reset Start and End
        </div>
        <div
          className="ToolBarResetWallButton toolbar-button"
          onClick={resetWall}
        >
          Reset Wall
        </div>
        <div
          className="ToolBarResetAllButton toolbar-button"
          onClick={resetAll}
        >
          Reset All
        </div>
        <div className="visualizeAlgoButton" onClick={visualizeAlgo}>
          Visualize Algorithm
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
