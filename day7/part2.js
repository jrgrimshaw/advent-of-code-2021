const fs = require("fs").promises;

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const crabPos = input
    .split("\n")[0]
    .split(",")
    .map((num) => parseInt(num));

  let allPossibleFuelTotals = [];

  for (let alPos = 0; alPos < Math.max(...crabPos); alPos++) {
    let totalFuel = 0;

    for (let pos of crabPos) {
      totalFuel += (Math.abs(pos - alPos) / 2) * (1 + Math.abs(pos - alPos));
    }

    allPossibleFuelTotals.push(totalFuel);
  }

  const shortestAlignmentTrip = Math.min(...allPossibleFuelTotals);
  console.log(shortestAlignmentTrip);
}

main();
