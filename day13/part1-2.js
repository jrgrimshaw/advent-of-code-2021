const fs = require("fs").promises;

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const instructions = input.split("\n\n")[1].split("\n").filter(Boolean);
  const coords = input
    .split("\n\n")[0]
    .split("\n")
    .filter(Boolean)
    .map((c) => c.split(","));

  let GRID_SIZE_X = Math.max(...coords.map((c) => c[0]));
  let GRID_SIZE_Y = Math.max(...coords.map((c) => c[1]));

  // Build matrix
  let matrix = Array(GRID_SIZE_X + 1)
    .fill(0)
    .map(() => Array(GRID_SIZE_Y + 1).fill(0));

  for (let c of coords) {
    matrix[c[0]][c[1]] = 1;
  }

  for (let ins of instructions) {
    const axis = ins.split(" ")[2].split("=")[0];
    const val = ins.split(" ")[2].split("=")[1];

    for (let x = axis === "x" ? val : 0; x <= GRID_SIZE_X; x++) {
      for (let y = axis === "y" ? val : 0; y <= GRID_SIZE_Y; y++) {
        if (matrix[x][y]) {
          if (axis === "x") matrix[val * 2 - x][y] = 1;
          else if (axis === "y") matrix[x][val * 2 - y] = 1;

          matrix[x][y] = 0;
        }
      }
    }

    if (axis === "x") GRID_SIZE_X -= val;
    if (axis === "y") GRID_SIZE_Y -= val;
  }

  // VISUALISATION & ANSWER CALC
  let visualOutput = "";
  let visibleDots = 0;

  for (let x = 0; x <= GRID_SIZE_Y; x++) {
    for (let y = 0; y <= GRID_SIZE_X; y++) {
      if (matrix[y][x]) {
        visualOutput += "#";
        visibleDots++;
      } else {
        visualOutput += ".";
      }
    }

    visualOutput += "\n";
  }

  console.log(visualOutput);
  console.log("visibleDots", visibleDots);
}

main();
