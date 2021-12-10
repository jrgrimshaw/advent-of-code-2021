const fs = require("fs").promises;

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const inputToArray = input.split("\n").filter((val) => val);

  let numOfIncreases = 0;

  for (let i = 0; i < inputToArray.length; i++) {
    const measurement = parseInt(inputToArray[i]);
    const prevMeasurement = parseInt(inputToArray[i - 1]);

    if (prevMeasurement) {
      if (measurement > prevMeasurement) {
        numOfIncreases = numOfIncreases + 1;
      }
    }
  }

  console.log(numOfIncreases);
}

main();
