import { useState } from "react";
import "./App.css";

import WhiteBox from "./components/WhiteBox";

function App() {
  const gridRow = Math.floor(window.innerWidth / 200);
  const gridCol = Math.floor(window.innerHeight / 200);

  // initial states
  const initialStates: boolean[][] = Array.from(Array(gridRow), () =>
    new Array(gridCol).fill(true)
  );

  // state, setState
  const [boxStates, setBoxStates] = useState<boolean[][]>(initialStates); // Track the color state

  // function processing
  const toggleStates = (i: number, j: number) => {
    console.log(`Toggleing (${i}-${j})`);
    const newStates = boxStates.map((row) => [...row]); // copies state
    newStates[i][j] = !newStates[i][j]; // swap logic

    setBoxStates(newStates); // sets mutated state
  };

  //
  const whiteBoxComponents = (
    <div className="grid">
      {
        boxStates.map(
          (row, i) =>
            row.map(
              (state, j) => (
                <WhiteBox
                  key={`${i}-${j}`}
                  pinkWhite={state}
                  onClick={() => toggleStates(i, j)}
                />
              ) // WhiteBox
            ) // row.map
        ) // boxStates.map
      }
    </div>
  );

  return <>{whiteBoxComponents}</>;
}

export default App;
