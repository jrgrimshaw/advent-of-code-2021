const fs = require("fs").promises;

function minRisk(dist, visited, MATRIX_SIZE_Y, MATRIX_SIZE_X) {
  let min = Infinity;
  let minIndex = false;

  for (let i = 0; i < MATRIX_SIZE_Y; i++) {
    for (let j = 0; j < MATRIX_SIZE_X; j++) {
      const v = `${i},${j}`;

      if (dist[v] < min && !visited[v]) {
        min = dist[v];
        minIndex = v;
      }
    }
  }

  return minIndex;
}

function dijkstra(matrix, src, dest) {
  const MATRIX_SIZE_Y = matrix.length;
  const MATRIX_SIZE_X = matrix[0].length;

  const dist = [],
    visited = [];

  for (let i = 0; i < MATRIX_SIZE_Y; i++) {
    for (let j = 0; j < MATRIX_SIZE_X; j++) {
      const v = `${i},${j}`;

      dist[v] = Infinity;
      visited[v] = false;
    }
  }

  dist[src] = 0;

  for (let i = 0; i < MATRIX_SIZE_Y; i++) {
    for (let j = 0; j < MATRIX_SIZE_X; j++) {
      const v = minRisk(dist, visited, MATRIX_SIZE_Y, MATRIX_SIZE_X);
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
        }
      }
    }
  }

  return dist[dest];
}

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const matrix = input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("").map(Number));

  console.log(dijkstra(matrix, "0,0", "99,99"));
}

main();
