const fs = require("fs").promises;

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const inputToArray = input.split("\n").filter((val) => val);

  let previousSum = false;
  let numOfSumIncreases = 0;
  let iterations = 0;

  for (let i = 0; i < inputToArray.length; i++) {
    if (inputToArray[i + 2]) {
      const threeMeasurementSum =
        parseInt(inputToArray[i]) +
        parseInt(inputToArray[i + 1]) +
        parseInt(inputToArray[i + 2]);

      console.log(threeMeasurementSum);

      if (previousSum) {
        if (threeMeasurementSum > previousSum) {
          numOfSumIncreases++;
        }
      }

      previousSum = threeMeasurementSum;
      iterations++;
    }
  }

  console.log("numOfSumIncreases", numOfSumIncreases);
  console.log("iterations", iterations);
  console.log("inputLength", inputToArray.length);
}

main();
