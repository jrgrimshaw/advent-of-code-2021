const fs = require("fs").promises;

function findCommonBitsAtArrPos(array, pos) {
  let zeroBits = 0;
  let oneBits = 0;

  for (let j = 0; j < array.length; j++) {
    const bitAtCurrentPos = array[j][pos];

    if (bitAtCurrentPos === "0") zeroBits++;
    if (bitAtCurrentPos === "1") oneBits++;
  }

  return {
    mostCommonBit: zeroBits > oneBits ? "0" : "1",
    leastCommonBit: zeroBits <= oneBits ? "0" : "1",
  };
}

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const inputToArray = input.split("\n").filter((val) => val);

  let oxyGenRatingArr = inputToArray;
  let co2RatingArr = inputToArray;

  for (let i = 0; i < 12; i++) {
    if (oxyGenRatingArr.length > 1) {
      const { mostCommonBit } = findCommonBitsAtArrPos(oxyGenRatingArr, i);

      oxyGenRatingArr = oxyGenRatingArr.filter(
        (binVal) => binVal[i] === mostCommonBit
      );
    }

    if (co2RatingArr.length > 1) {
      const { leastCommonBit } = findCommonBitsAtArrPos(co2RatingArr, i);

      co2RatingArr = co2RatingArr.filter(
        (binVal) => binVal[i] === leastCommonBit
      );
    }
  }

  const oxygenGeneratorRating = parseInt(oxyGenRatingArr[0], 2);
  const co2ScrubberRating = parseInt(co2RatingArr[0], 2);
  const lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;

  console.log("oxygenGeneratorRating", oxygenGeneratorRating);
  console.log("co2ScrubberRating", co2ScrubberRating);
  console.log("lifeSupportRating", lifeSupportRating);
}

main();
