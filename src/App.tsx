import { useState } from "react";
import "./App.css";

import WhiteBox from "./components/WhiteBox";

function App() {
  const [argPinkWhite, setPinkWhite] = useState(true); // Track the color state

  const togglePinkWhite = () => {
    let currColor = argPinkWhite ? "white" : "pink"; // logic
    console.log(currColor);

    setPinkWhite(prev => !prev); // Setter call
  };

  return (
    <>
      <WhiteBox pinkWhite={argPinkWhite} onClick={togglePinkWhite} />
    </>
  );
}

export default App;
