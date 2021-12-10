const fs = require("fs").promises;

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const inputToArray = input.split("\n").filter((val) => val);

  let gammaRate = "";
  let epsilonRate = "";

  let positionalBitCounts = [];

  for (let i = 0; i < inputToArray.length; i++) {
    const binaryNumToArray = inputToArray[i].split("");

    for (let j = 0; j < binaryNumToArray.length; j++) {
      if (!positionalBitCounts[j]) {
        positionalBitCounts[j] = { zeroBits: 0, oneBits: 0 };
      }

      positionalBitCounts[j].zeroBits += binaryNumToArray[j] === "0" ? 1 : 0;
      positionalBitCounts[j].oneBits += binaryNumToArray[j] === "1" ? 1 : 0;
    }
  }

  for (let k = 0; k < positionalBitCounts.length; k++) {
    const { zeroBits, oneBits } = positionalBitCounts[k];

    if (zeroBits > oneBits) {
      gammaRate += "0";
      epsilonRate += "1";
    } else {
      gammaRate += "1";
      epsilonRate += "0";
    }
  }

  console.log("gammaRate", parseInt(gammaRate, 2));
  console.log("epsilonRate", parseInt(epsilonRate, 2));
  console.log(
    "powerConsumption",
    parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
  );
}

main();
