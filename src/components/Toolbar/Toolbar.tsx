import React from "react";
import { Button, ButtonGroup, FormControl, Box, MenuItem, Select } from "@mui/material";

interface ToolbarProps {
  itemPlacement: number;
  setItemPlacement: (item: number) => void;

  algorithmSelected: string;
  setAlgorithm: (algo: string) => void;

  resetStartEnd: () => void;
  resetWall: () => void;
  resetAll: () => void;
  visualizeAlgo: () => void;
  resetAnimation: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  itemPlacement,
  setItemPlacement,

  algorithmSelected,
  setAlgorithm,

  resetStartEnd,
  resetWall,
  resetAll,
  visualizeAlgo,
  resetAnimation,
}) => {
  const selectedValue = itemPlacement;

  const toolLabels: Record<number, string> = {
    1: "Wall",
    2: "Start",
    3: "End",
  };

  return (
    <Box
      sx={{
      backgroundColor: "white",
      borderRadius: 2,
      p: 1,
      mb: 2,
      display: "flex",
      alignItems: "center",
      gap: 2,
      flexWrap: "wrap",
    }}
    >
      <ButtonGroup variant="outlined" color="primary">
        {Array.from({ length: 5 }, (_, i) => {
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
      <FormControl sx={{ m: 1, minWidth: 100}} color="primary">
        <Select
          labelId="selectedAlgorithm"
          value={algorithmSelected}
          onChange={(e) => setAlgorithm(e.target.value as string)}
          autoWidth
        >
          <MenuItem value="BFS">BFS</MenuItem>
          <MenuItem value="DFS">DFS</MenuItem>
          <MenuItem value="dijkstra">Dijkstra's</MenuItem>
          <MenuItem value="a_star">A*</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="success"
        sx={{ ml: 2 }}
        onClick={visualizeAlgo}
        >
          Visualize Algorithm
      </Button>
      <ButtonGroup variant="outlined" color="secondary" sx={{ ml: 2 }}>
        <Button onClick={resetAnimation}>Reset Animation</Button>
        <Button onClick={resetWall}>Reset Wall</Button>
        <Button onClick={resetStartEnd}>Reset Start & End</Button>
        <Button onClick={resetAll}>Reset All</Button>
      </ButtonGroup>
    </Box>
  );
};

export default Toolbar;

