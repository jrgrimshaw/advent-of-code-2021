const fs = require("fs").promises;
const MinHeap = require("./MinHeap");

function dijkstra(matrix, src, dest, MATRIX_SIZE_Y, MATRIX_SIZE_X) {
  const dist = [],
    visited = [],
    distpq = [];

  for (let i = 0; i < MATRIX_SIZE_Y; i++) {
    for (let j = 0; j < MATRIX_SIZE_X; j++) {
      const v = `${i},${j}`;

      visited[v] = false;
      dist[v] = Infinity;
    }
  }

  dist[src] = 0;
  MinHeap.push(distpq, [0, src]);

  for (let i = 0; i < MATRIX_SIZE_Y; i++) {
    for (let j = 0; j < MATRIX_SIZE_X; j++) {
      const [d, v] = MinHeap.pop(distpq);
      const [vi, vj] = v.split(",").map(Number);

      visited[v] = true;

      const neighbours = [];
      if (vi - 1 >= 0) neighbours.push([vi - 1, vj]);
      if (vi + 1 < MATRIX_SIZE_Y) neighbours.push([vi + 1, vj]);
      if (vj - 1 >= 0) neighbours.push([vi, vj - 1]);
      if (vj + 1 < MATRIX_SIZE_X) neighbours.push([vi, vj + 1]);

      for (let [ni, nj] of neighbours) {
        if (visited[`${ni},${nj}`]) continue;

        if (dist[`${ni},${nj}`] > dist[v] + matrix[ni][nj]) {
          dist[`${ni},${nj}`] = dist[v] + matrix[ni][nj];
          MinHeap.push(distpq, [dist[v] + matrix[ni][nj], `${ni},${nj}`]);
        }
      }
    }
  }

  return dist[dest];
}

async function main() {
  console.time("perf");

  const input = await fs.readFile("input.txt", "utf8");
  const matrix = input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("").map(Number));

  const MATRIX_SIZE_Y = matrix.length;
  const MATRIX_SIZE_X = matrix[0].length;
  const MULTIPLY_FACTOR = 5;

  const newMatrix = Array(MATRIX_SIZE_Y * MULTIPLY_FACTOR)
    .fill()
    .map(() => []);

  // Build 5x matrix
  for (let k = 0; k < MULTIPLY_FACTOR; k++) {
    for (let l = 0; l < MULTIPLY_FACTOR; l++) {
      for (let i = 0; i < MATRIX_SIZE_Y; i++) {
        for (let j = 0; j < MATRIX_SIZE_X; j++) {
          let newVal = matrix[i][j] + k + l;
          if (newVal > 9) newVal %= 9;

          newMatrix[i + k * MATRIX_SIZE_Y].push(newVal);
        }
      }
    }
  }

  console.log(
    dijkstra(
      newMatrix,
      "0,0",
      "499,499",
      MATRIX_SIZE_Y * MULTIPLY_FACTOR,
      MATRIX_SIZE_X * MULTIPLY_FACTOR
    )
  );

  console.timeEnd("perf");
}

main();
