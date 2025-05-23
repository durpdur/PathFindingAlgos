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

  // Swap Start Coordinates
  const swapStartNodeCoord = (i: number, j: number, newStates: number[][]) => {
    const [currI, currJ] = startNodeCoord;
    newStates[currI][currJ] = 0;

    setStartNodeCoord([i, j]);
    newStates[i][j] = 2;
  };

  // Swap End Coordinates
  const swapEndNodeCoord = (i: number, j: number, newStates: number[][]) => {
    const [currI, currJ] = endNodeCoord;
    newStates[currI][currJ] = 0;

    setEndNodeCoord([i, j]);
    newStates[i][j] = 3;
  };

  // Handles item placement and associated selection type
  const handleItemPlacement = (i: number, j: number, itemSelected: number) => {
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

  // Resets just the start and end
  const resetStartAndEnd = () => {
    const newStart: [number, number] = [
      Math.floor(gridRow / 5),
      Math.floor(gridCol / 5),
    ];
    const newEnd: [number, number] = [
      Math.floor(gridRow / 5) * 4,
      Math.floor(gridCol / 5) * 4,
    ];

    const newBoxStates = boxStates;
    newBoxStates[newStart[0]][newStart[1]] = 2;
    newBoxStates[newEnd[0]][newEnd[1]] = 3;

    swapStartNodeCoord(newStart[0], newStart[1], newBoxStates);
    swapEndNodeCoord(newEnd[0], newEnd[1], newBoxStates);
    setBoxStates(newBoxStates);
  };

  // Resets everything except for the start ane end
  const resetWallStates = () => {
    const newBoxStates = Array.from({ length: gridRow }, () =>
      Array(gridCol).fill(0)
    );

    newBoxStates[startNodeCoord[0]][startNodeCoord[1]] = 2;
    newBoxStates[endNodeCoord[0]][endNodeCoord[1]] = 3;

    setBoxStates(newBoxStates);
  };

  // Resets everything back to default
  const resetAll = () => {
    const newStart: [number, number] = [
      Math.floor(gridRow / 5),
      Math.floor(gridCol / 5),
    ];
    const newEnd: [number, number] = [
      Math.floor(gridRow / 5) * 4,
      Math.floor(gridCol / 5) * 4,
    ];

    const newBoxStates = Array.from({ length: gridRow }, () =>
      Array(gridCol).fill(0)
    );
    newBoxStates[newStart[0]][newStart[1]] = 2;
    newBoxStates[newEnd[0]][newEnd[1]] = 3;

    setStartNodeCoord(newStart);
    setEndNodeCoord(newEnd);
    setBoxStates(newBoxStates);
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
        resetStartEnd={resetStartAndEnd}
        resetWall={resetWallStates}
        resetAll={resetAll}
      />
      <Grid
        boxStates={boxStates}
        togglesStates={handleItemPlacement}
        selectionType={selectionType}
        itemSelected={currentItemSelected}
      />
    </div>
  );
}

export default App;
