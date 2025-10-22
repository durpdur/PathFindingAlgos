// Types
export type Coord = [number, number];

export interface DijkstraOptions {
  // Cost for stepping *into* a cell with value `cellValue` at (i,j).
  // Defaults to 1 for all traversable cells.
  costOf?: (cellValue: number, i: number, j: number) => number;
  // 4-way by default; pass your own if you want diagonals.
  directions?: ReadonlyArray<Readonly<[number, number]>>;
  // Which cell value is considered a wall (non-traversable)
  wallValue?: number;
}

export interface DijkstraResult {
  visitedNodesInOrder: Coord[];
  shortestPath: Coord[];
  distances: number[][];
  prev: (Coord | null)[][];
  reached: boolean;
}

// Minimal min-heap for { i, j, dist } or any T with a comparator
class MinHeap<T> {
  private a: T[] = [];
  private cmp: (x: T, y: T) => number;

  constructor(cmp: (x: T, y: T) => number) {
    this.cmp = cmp; // ✅ store the comparator
  }

  push(x: T) {
    this.a.push(x);
    this.bubbleUp(this.a.length - 1);
  }

  pop(): T | undefined {
    if (this.a.length === 0) return undefined;
    const min = this.a[0];
    const last = this.a.pop()!;
    if (this.a.length > 0) {
      this.a[0] = last;
      this.sinkDown(0);
    }
    return min;
  }

  get size(): number {
    return this.a.length;
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.cmp(this.a[i], this.a[p]) >= 0) break;
      const tmp = this.a[i];
      this.a[i] = this.a[p];
      this.a[p] = tmp;
      i = p;
    }
  }

  private sinkDown(i: number): void {
    const n = this.a.length;
    while (true) {
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      let s = i;

      if (l < n && this.cmp(this.a[l], this.a[s]) < 0) s = l;
      if (r < n && this.cmp(this.a[r], this.a[s]) < 0) s = r;

      if (s === i) break;

      const tmp = this.a[i];
      this.a[i] = this.a[s];
      this.a[s] = tmp;

      i = s;
    }
  }
}


type Node = { i: number; j: number; dist: number };

/**
 * Dijkstra's algorithm on a grid.
 * - `boxStates[i][j] === 1` is treated as a wall (configurable via options.wallValue).
 * - By default, each move costs 1 (configurable via options.costOf).
 * - 4-directional movement by default (configurable via options.directions).
 */
export function dijkstras(
  boxStates: number[][],
  start: Coord,
  end: Coord,
  options: DijkstraOptions = {}
): DijkstraResult {
  const rows = boxStates.length;
  const cols = boxStates[0]?.length ?? 0;

  const {
    costOf = () => 1,
    directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ],
    wallValue = 1,
  } = options;

  // Distances & prev
  const distances = Array.from({ length: rows }, () =>
    Array<number>(cols).fill(Infinity)
  );
  const prev: (Coord | null)[][] = Array.from({ length: rows }, () =>
    Array<Coord | null>(cols).fill(null)
  );

  // To record the order in which nodes are "finalized" (popped from heap)
  const visitedNodesInOrder: Coord[] = [];

  // Guard: invalid grid
  if (rows === 0 || cols === 0) {
    return {
      visitedNodesInOrder,
      shortestPath: [],
      distances,
      prev,
      reached: false,
    };
  }

  // Guard: start or end is a wall
  if (
    boxStates[start[0]]?.[start[1]] === wallValue ||
    boxStates[end[0]]?.[end[1]] === wallValue
  ) {
    return {
      visitedNodesInOrder,
      shortestPath: [],
      distances,
      prev,
      reached: false,
    };
  }

  // Min-heap by distance
  const heap = new MinHeap<Node>((a, b) => a.dist - b.dist);

  // Initialize
  distances[start[0]][start[1]] = 0;
  heap.push({ i: start[0], j: start[1], dist: 0 });

  const inBounds = (i: number, j: number) =>
    i >= 0 && j >= 0 && i < rows && j < cols;

  // Dijkstra
  while (heap.size > 0) {
    const curr = heap.pop()!;
    const { i, j, dist } = curr;

    // If this is a stale entry (we already found a better distance), skip
    if (dist !== distances[i][j]) continue;

    visitedNodesInOrder.push([i, j]);

    // Early exit if we reached the end
    if (i === end[0] && j === end[1]) break;

    for (const [di, dj] of directions) {
      const ni = i + di;
      const nj = j + dj;
      if (!inBounds(ni, nj)) continue;
      if (boxStates[ni][nj] === wallValue) continue;

      const stepCost = costOf(boxStates[ni][nj], ni, nj);
      const nd = dist + stepCost;

      if (nd < distances[ni][nj]) {
        distances[ni][nj] = nd;
        prev[ni][nj] = [i, j];
        heap.push({ i: ni, j: nj, dist: nd });
      }
    }
  }

  // Reconstruct shortest path (if reachable)
  const shortestPath: Coord[] = [];
  let reached = distances[end[0]][end[1]] !== Infinity;

  if (reached) {
    let at: Coord | null = end;
    while (at) {
      shortestPath.unshift(at);
      const p: Coord | null = prev[at[0]][at[1]];
      at = p;
    }
  }

  return { visitedNodesInOrder, shortestPath, distances, prev, reached };
}
