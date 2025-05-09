import { useState, useEffect } from "react";
import "./App.css";

import Grid from "./components/Grid/Grid";

function App() {
  // CONSTANTS
  const gridRow = Math.floor(innerHeight / 50) - 3;
  const gridCol = Math.floor(innerWidth / 50) - 2;

  // STATES
  const [boxStates, setBoxStates] = useState<boolean[][]>(
    Array.from({ length: gridRow }, () => Array(gridCol).fill(true))
  );

  const [selectionType, setSelectionType] = useState<
    "click" | "click-and-drag"
  >("click");

  // FUNCTIONS
  const toggleBoxStates = (i: number, j: number) => {
    const newStates = boxStates.map((row) => [...row]);
    newStates[i][j] = !newStates[i][j];
    setBoxStates(newStates);
  };

  const toggleSelectionType = () => {
    setSelectionType((prevType) =>
      prevType === "click" ? "click-and-drag" : "click"
    );
  };

  // useEffect
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
        Switch to {selectionType === "click" ? "Click and Drag" : "Click"}{" "}
        Selection
      </button>
      <Grid
        boxStates={boxStates}
        togglesStates={toggleBoxStates}
        selectionType={selectionType}
      />
    </div>
  );
}

export default App;
