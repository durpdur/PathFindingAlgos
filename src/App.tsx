import { useState, useEffect } from "react";
import "./App.css";
import { bfs } from "./algorithms/algorithmsAggregator";

import Grid from "./components/Grid";
import Toolbar from "./components/Toolbar/Toolbar";

function App() {
  /******************** 
   CONSTANTS 
  ********************/
  const nodeSize = 35;
  const gridRow = Math.floor(innerHeight / nodeSize) - 3;
  const gridCol = Math.floor(innerWidth / nodeSize) - 2;

  /******************** 
   STATES 
  ********************/
  // The item currently selected to be placed in the grid
  const [currentItemSelected, setCurrentItemSelected] = useState<number>(1);

  // Start position (x, y)
  const [startNodeCoord, setStartNodeCoord] = useState<[number, number]>([
    Math.floor(gridRow / 5),
    Math.floor(gridCol / 5),
  ]);

  // End position (x, y)
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

  // Type of algorithm selected
  const [algorithm, setAlgorithm] = useState<string>("BFS");

  /******************** 
   FUNCTIONS
  ********************/

  // Change Start Coordinates
  const swapStartNodeCoord = (i: number, j: number, newStates: number[][]) => {
    const [currI, currJ] = startNodeCoord;
    newStates[currI][currJ] = 0;

    setStartNodeCoord([i, j]);
    newStates[i][j] = 2;
  };

  // Change End Coordinates
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

  // Resets start and end
  const resetStartAndEnd = () => {
    const newStart: [number, number] = [Math.floor(gridRow / 5), Math.floor(gridCol / 5)];
    const newEnd: [number, number] = [Math.floor(gridRow / 5) * 4, Math.floor(gridCol / 5) * 4];

    // deep clone
    const newBoxStates = boxStates.map(row => [...row]);

    // clear old start/end
    const [oldSRow, oldSCol] = startNodeCoord;
    const [oldERow, oldECol] = endNodeCoord;
    newBoxStates[oldSRow][oldSCol] = 0;
    newBoxStates[oldERow][oldECol] = 0;

    // set new start/end
    newBoxStates[newStart[0]][newStart[1]] = 2;
    newBoxStates[newEnd[0]][newEnd[1]] = 3;

    setStartNodeCoord(newStart);
    setEndNodeCoord(newEnd);
    setBoxStates(newBoxStates);
  };

  // Resets everything except for the start and end
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

  // Resets just the animation squares, essentially restarts visualization
  const resetAnimation = () => {
    const newBoxStates = boxStates.map(row => {
      return row.map(value => {
        if (value === 4 || value === 5) {
          return 0;
        } else {
          return value;
        }
      })
    });

    setBoxStates(newBoxStates);
  }
  
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

  /******************** 
   Path visualization
  ********************/

  // Visualize algorithm by their visited nodes in order and shortest path found
  const visualizeAlgorithm = () => {
    resetAnimation();

    const { visitedNodesInOrder, shortestPath } = bfs(
      boxStates,
      startNodeCoord,
      endNodeCoord
    );

    const newBoxStates = boxStates.map((row) => [...row]);

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        if (i === visitedNodesInOrder.length) {
          // Step 2: After visiting all nodes, animate shortest path
          animateShortestPath(shortestPath);
          return;
        }

        const [row, col] = visitedNodesInOrder[i];

        // Avoid overwriting start/end nodes
        if (newBoxStates[row][col] !== 2 && newBoxStates[row][col] !== 3) {
          newBoxStates[row][col] = 4; // Use `4` to indicate visited node
          setBoxStates((prev) => {
            const updated = prev.map((row) => [...row]);
            updated[row][col] = 4;
            return updated;
          });
        }
      }, 10 * i); // 10ms per step (adjust for speed)
    }
  };

  // Animates shortest path
  const animateShortestPath = (shortestPath: [number, number][]) => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const [row, col] = shortestPath[i];

        // Avoid overwriting start/end nodes
        if (boxStates[row][col] !== 2 && boxStates[row][col] !== 3) {
          setBoxStates((prev) => {
            const updated = prev.map((row) => [...row]);
            updated[row][col] = 5; // Use `5` to indicate shortest path node
            return updated;
          });
        }
      }, 30 * i); // Slower to distinguish from visited
    }
  };

  /******************** 
   useEffect 
  ********************/
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

  /******************** 
   RETURN    
  ********************/
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center", // vertical centering
      height: "100vh", // full screen height
    }}>
      <Toolbar
        algorithmSelected={algorithm}
        setAlgorithm={setAlgorithm}
        itemPlacement={currentItemSelected}
        setItemPlacement={handleItemSelect}
        resetStartEnd={resetStartAndEnd}
        resetWall={resetWallStates}
        resetAll={resetAll}
        visualizeAlgo={visualizeAlgorithm}
        resetAnimation={resetAnimation}
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
