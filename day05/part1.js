const fs = require("fs").promises;

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const ventInputs = input
    .split("\n")
    .filter(Boolean)
    .map((v) => v.split(" -> "));

  let allCoords = [];

  for (let coordSet of ventInputs) {
    const fromCoords = coordSet[0].split(",");
    const toCoords = coordSet[1].split(",");

    const xCoords = [fromCoords[0], toCoords[0]].sort((a, b) => a - b);
    const yCoords = [fromCoords[1], toCoords[1]].sort((a, b) => a - b);

    if (xCoords[0] === xCoords[1] || yCoords[0] === yCoords[1]) {
      for (let x = parseInt(xCoords[0]); x <= parseInt(xCoords[1]); x++) {
        for (let y = parseInt(yCoords[0]); y <= parseInt(yCoords[1]); y++) {
          allCoords.push(`${x},${y}`);
        }
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
}

main();
