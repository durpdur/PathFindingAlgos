import React from "react";
import { Button, ButtonGroup } from "@mui/material";

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

  const toolLabels: Record<number, string> = {
    1: "Wall",
    2: "Start",
    3: "End",
  };

  return (
    <div style={{ padding: "8px" }}>
      <ButtonGroup variant="outlined" color="primary">
        {Array.from({ length: 10 }, (_, i) => {
          const number = i + 1;
          const label = toolLabels[number] ?? number.toString();

          return (
            <Button
              key={number}
              variant={selectedValue === number ? "contained" : "outlined"}
              onClick={() => setItemPlacement(number)}
            >
              {label}
            </Button>
          );
        })}
      </ButtonGroup>

      <ButtonGroup variant="outlined" color="secondary" sx={{ ml: 2 }}>
        <Button onClick={resetStartEnd}>Reset Start & End</Button>
        <Button onClick={resetWall}>Reset Wall</Button>
        <Button onClick={resetAll}>Reset All</Button>
      </ButtonGroup>

      <Button
        variant="contained"
        color="success"
        sx={{ ml: 2 }}
        onClick={visualizeAlgo}
      >
        Visualize Algorithm
      </Button>
    </div>
  );
};

export default Toolbar;

