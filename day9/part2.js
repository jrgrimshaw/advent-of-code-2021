const fs = require("fs").promises;

function findInMatrix(matrix, i, j) {
  if (i >= 0 && i < matrix.length && j >= 0 && j < matrix[i].length) {
    return matrix[i][j];
  }

  return -1;
}

function findBasin(matrix, i, j) {
  let basinPoints = [];

  function searchAroundPoint(i, j) {
    if (!basinPoints.includes(`${i},${j}`)) {
      basinPoints.push(`${i},${j}`);

      if (
        findInMatrix(matrix, i - 1, j) >= 0 &&
        findInMatrix(matrix, i - 1, j) < 9
      ) {
        searchAroundPoint(i - 1, j);
      }

      if (
        findInMatrix(matrix, i, j - 1) >= 0 &&
        findInMatrix(matrix, i, j - 1) < 9
      ) {
        searchAroundPoint(i, j - 1);
      }

      if (
        findInMatrix(matrix, i + 1, j) >= 0 &&
        findInMatrix(matrix, i + 1, j) < 9
      ) {
        searchAroundPoint(i + 1, j);
      }

      if (
        findInMatrix(matrix, i, j + 1) >= 0 &&
        findInMatrix(matrix, i, j + 1) < 9
      ) {
        searchAroundPoint(i, j + 1);
      }
    }
  }

  searchAroundPoint(i, j);

  return basinPoints.length;
}

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const matrix = input
    .split("\n")
    .filter(Boolean)
    .map((r) => r.split("").map((x) => parseInt(x)));

  const basins = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i - 1 >= 0) if (matrix[i - 1][j] <= matrix[i][j]) continue;
      if (j - 1 >= 0) if (matrix[i][j - 1] <= matrix[i][j]) continue;
      if (i + 1 < matrix.length) if (matrix[i + 1][j] <= matrix[i][j]) continue;
      if (j + 1 < matrix[i].length)
        if (matrix[i][j + 1] <= matrix[i][j]) continue;

      // We've found a low point - discover basin
      basins.push(findBasin(matrix, i, j));
    }
  }

  // find 3 largest basins
  basins.sort((a, b) => b - a);
  console.log(basins[0] * basins[1] * basins[2]);
}

main();
