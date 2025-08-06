# App Structure

## App.tsx

**States**
- gridState
  - resetGrid
  - visualizeAlgorithm

- currentAlgorithm

### Toolbar
- Algorithm Selector
- Maze Generator
- Wall Placer
- Reset Grid
- Reset Obstacles
- Start
- End
- Speed Adjustment
- Timeline
  - e.g. showing steps from __ to __

### Grid
Argument
- boxStates
- togglesStates

#### Node
- Filled
  - Wall
  - Start
  - End
  - Path
  - Weighted

---

## To update prod
- npm run build
- npm run deploy
  - npm runs <script>
    - script being "gh-pages -d dist"
      - "gh-pages" is the branch
      - "-d dist" is the directory **dist** is being pushed to the branch

# 
