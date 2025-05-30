export function bfs(
  boxStates: number[][],
  start: [number, number],
  end: [number, number]
) {
  const visitedNodesInOrder: [number, number][] = [];
  const shortestPath: [number, number][] = [];

  const rows = boxStates.length;
  const cols = boxStates[0].length;

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const prev: ([number, number] | null)[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );

  const queue: [number, number][] = [];
  queue.push(start);
  visited[start[0]][start[1]] = true;

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (queue.length > 0) {
    const [i, j] = queue.shift()!;
    visitedNodesInOrder.push([i, j]);

    if (i === end[0] && j === end[1]) break;

    for (const [di, dj] of directions) {
      const ni = i + di;
      const nj = j + dj;

      if (
        ni >= 0 &&
        nj >= 0 &&
        ni < rows &&
        nj < cols &&
        !visited[ni][nj] &&
        boxStates[ni][nj] !== 1 // wall check
      ) {
        queue.push([ni, nj]);
        visited[ni][nj] = true;
        prev[ni][nj] = [i, j];
      }
    }
  }

  // Reconstruct shortest path
  let at: [number, number] | null = end;
  while (at && prev[at[0]][at[1]]) {
    shortestPath.unshift(at);
    at = prev[at[0]][at[1]];
  }
  if (at) shortestPath.unshift(at); // add start node

  return { visitedNodesInOrder, shortestPath };
}
