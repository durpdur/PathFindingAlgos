/* 
App:
- gridState
  - resetGrid
  - visualizeAlgorithm

- currentAlgorithm
*/

import { useState, useEffect } from "react";
import "./App.css";

import Grid from "./components/Grid";
import Toolbar from "./components/Toolbar";

function App() {
  // CONSTANTS
  const nodeSize = 50;
  const gridRow = Math.floor(innerHeight / nodeSize) - 3;
  const gridCol = Math.floor(innerWidth / nodeSize) - 2;

  // STATES
  // The item currently selected to be placed in the grid
  const [currentItemSelected, setCurrentItemSelected] = useState<number>(1);

  // One start position
  const [startNodeCoord, setStartNodeCoord] = useState<[number, number]>([
    Math.floor(gridRow / 5),
    Math.floor(gridCol / 5),
  ]);

  // One end position
  const [endNodeCoord, setEndNodeCoord] = useState<[number, number]>([
    Math.floor(gridRow / 5) * 4,
    Math.floor(gridCol / 5) * 4,
  ]);

  // Grid State
  const [boxStates, setBoxStates] = useState<number[][]>(() => {
    const initialStates = Array.from({ length: gridRow }, () =>
      Array(gridCol).fill(0)
    );

    const [initialStartRow, initialStartCol] = startNodeCoord;
    const [initialEndRow, initialEndCol] = endNodeCoord;

    initialStates[initialStartRow][initialStartCol] = 2;
    initialStates[initialEndRow][initialEndCol] = 3;

    return initialStates;
  });

  // Type of selection depending on currentItemSelected
  const [selectionType, setSelectionType] = useState<boolean>(true); // true: click and drag, false: click

  // FUNCTIONS
  const swapStartNodeCoord = (i: number, j: number, newStates: number[][]) => {
    const [currI, currJ] = startNodeCoord;
    newStates[currI][currJ] = 0;

    setStartNodeCoord([i, j]);
    newStates[i][j] = 2;
  };

  const swapEndNodeCoord = (i: number, j: number, newStates: number[][]) => {
    const [currI, currJ] = endNodeCoord;
    newStates[currI][currJ] = 0;

    setEndNodeCoord([i, j]);
    newStates[i][j] = 3;
  };

  const toggleBoxStates = (i: number, j: number, itemSelected: number) => {
    const newStates = boxStates.map((row) => [...row]);

    if (itemSelected == 2) {
      swapStartNodeCoord(i, j, newStates);
    } else if (itemSelected == 3) {
      swapEndNodeCoord(i, j, newStates);
    } else {
      if (newStates[i][j]) {
        if (newStates[i][j] == itemSelected) {
          newStates[i][j] = 0;
        }
      } else {
        newStates[i][j] = itemSelected;
      }
    }
    setBoxStates(newStates);
  };

  // Set the current item being placed, and what mode of placement it is
  const handleItemSelect = (itemSelected: number) => {
    setCurrentItemSelected(itemSelected);
    setSelectionType(itemSelected == 1);

    console.log(
      selectionType ? "click-and-drag" : "click",
      ", Item Selected",
      currentItemSelected
    );
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
      <Toolbar
        itemPlacement={currentItemSelected}
        setItemPlacement={handleItemSelect}
      />
      <Grid
        boxStates={boxStates}
        togglesStates={toggleBoxStates}
        selectionType={selectionType}
        itemSelected={currentItemSelected}
      />
    </div>
  );
}

export default App;
