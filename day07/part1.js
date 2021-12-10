const fs = require("fs").promises;

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const crabPos = input
    .split("\n")[0]
    .split(",")
    .map((num) => parseInt(num));

  const sortedInput = crabPos.sort((a, b) => a - b);
  const median = sortedInput[Math.round(sortedInput.length / 2)];

  let fuelUsed = 0;
  for (let pos of crabPos) {
    fuelUsed += Math.abs(median - pos);
  }

  console.log("median", median);
  console.log("fuelUsed", fuelUsed);
}

main();
