const fs = require("fs").promises;

async function main() {
  console.time("execTime");

  const input = await fs.readFile("input.txt", "utf8");
  const ventInputs = input
    .split("\n")
    .filter(Boolean)
    .map((v) => v.split(" -> "));

  let allCoords = [];

  for (let coordSet of ventInputs) {
    const fromCoords = coordSet[0].split(",");
    const toCoords = coordSet[1].split(",");

    let xCoords = [parseInt(fromCoords[0]), parseInt(toCoords[0])],
      yCoords = [parseInt(fromCoords[1]), parseInt(toCoords[1])];

    if (xCoords[0] === xCoords[1] || yCoords[0] === yCoords[1]) {
      // Horizontal and vertical lines
      for (let x = Math.min(...xCoords); x <= Math.max(...xCoords); x++) {
        for (let y = Math.min(...yCoords); y <= Math.max(...yCoords); y++) {
          allCoords.push(`${x},${y}`);
        }
      }
    } else {
      // diagonal lines
      let x = xCoords[0],
        y = yCoords[0],
        deltaX = xCoords[0] < xCoords[1] ? 1 : -1,
        deltaY = yCoords[0] < yCoords[1] ? 1 : -1;

      for (let range = 0; range <= Math.abs(xCoords[0] - xCoords[1]); range++) {
        allCoords.push(`${x},${y}`);
        x += deltaX;
        y += deltaY;
      }
    }
  }

  // Calculate crossovers
  let totalCrossovers = 0;

  const coordCrossovers = allCoords.reduce((prev, cur) => {
    prev[cur] = (prev[cur] || 0) + 1;
    return prev;
  }, {});

  for (let coord in coordCrossovers) {
    if (coordCrossovers[coord] > 1) totalCrossovers++;
  }

  console.log("totalCrossovers", totalCrossovers);
  console.timeEnd("execTime");

  // // Draw grid
  // const GRID_SIZE = 10;

  // for (let y = 0; y < GRID_SIZE; y++) {
  //   let line = "";

  //   for (let x = 0; x < GRID_SIZE; x++) {
  //     line += coordCrossovers[`${x},${y}`] || ".";
  //   }

  //   console.log(line);
  // }
}

main();
