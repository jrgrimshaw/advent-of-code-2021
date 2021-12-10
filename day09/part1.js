const fs = require("fs").promises;

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const matrix = input
    .split("\n")
    .filter(Boolean)
    .map((r) => r.split("").map((x) => parseInt(x)));

  const lowPoints = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i - 1 >= 0) if (matrix[i - 1][j] <= matrix[i][j]) continue;
      if (j - 1 >= 0) if (matrix[i][j - 1] <= matrix[i][j]) continue;
      if (i + 1 < matrix.length) if (matrix[i + 1][j] <= matrix[i][j]) continue;
      if (j + 1 < matrix[i].length)
        if (matrix[i][j + 1] <= matrix[i][j]) continue;

      lowPoints.push(matrix[i][j]);
    }
  }

  console.log(lowPoints.reduce((acc, val) => acc + val + 1, 0));
}

main();
