/* 
App:
- gridState
  - resetGrid
  - visualizeAlgorithm

- currentAlgorithm
*/

import { useState, useEffect } from "react";
import "./App.css";

import Grid from "./components/Grid/Grid";
import Toolbar from "./components/Toolbar/Toolbar";

function App() {
  // CONSTANTS
  const gridRow = Math.floor(innerHeight / 50) - 3;
  const gridCol = Math.floor(innerWidth / 50) - 2;

  // STATES
  const [boxStates, setBoxStates] = useState<number[][]>(
    Array.from({ length: gridRow }, () => Array(gridCol).fill(0))
  );

  const [selectionType, setSelectionType] = useState<
    "click" | "click-and-drag"
  >("click");

  const [itemPlacement, setItemPlacement] = useState<number>(1);

  // FUNCTIONS
  // can only place something down when 0
  const toggleBoxStates = (i: number, j: number, itemSelected: number) => {
    const newStates = boxStates.map((row) => [...row]);
    if (newStates[i][j]) {
      if (newStates[i][j] == itemSelected) {
        newStates[i][j] = 0;
      }
    } else {
      newStates[i][j] = itemSelected;
    }
    setBoxStates(newStates);
  };

  const toggleSelectionType = () => {
    setSelectionType((prevType) =>
      prevType === "click" ? "click-and-drag" : "click"
    );
  };

  const handleItemSelect = (itemSelected: number) => {
    setItemPlacement(itemSelected);

    console.log("Item Selected", itemSelected);
  };

  // useEffect
  // CSS Styling w/ useEffect
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--grid-cols",
      gridCol.toString()
    );
    document.documentElement.style.setProperty(
      "--grid-rows",
      gridRow.toString()
    );
  }, [gridRow, gridCol]);

  // RETURN
  return (
    <div>
      <button onClick={toggleSelectionType}>
        Currently: "{selectionType === "click" ? "Click" : "Click and Drag"} "
        Selection
      </button>
      <Grid
        boxStates={boxStates}
        togglesStates={toggleBoxStates}
        selectionType={selectionType}
        itemSelected={itemPlacement}
      />
      <Toolbar
        itemPlacement={itemPlacement}
        setItemPlacement={handleItemSelect}
      />
    </div>
  );
}

export default App;
