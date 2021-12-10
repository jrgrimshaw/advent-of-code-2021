const fs = require("fs").promises;

function findSegmentWithinSegment(partialSegment, fullSegment) {
  for (let letter of partialSegment.split("")) {
    if (!fullSegment.split("").includes(letter)) return false;
  }

  return true;
}

function segmentSubtract(subtraction, fullSegment) {
  return fullSegment
    .split("")
    .filter((s) => !subtraction.split("").includes(s));
}

function buildMapFromInput(input) {
  const signals = input.split(" ");
  let signalMap = [];

  while (signalMap.filter(Boolean).length < signals.length) {
    for (let signal of signals) {
      if (signal.length === 2) signalMap[1] = signal;
      else if (signal.length === 3) signalMap[7] = signal;
      else if (signal.length === 4) signalMap[4] = signal;
      else if (signal.length === 7) signalMap[8] = signal;
      else if (signalMap[7] && signalMap[4] && signalMap[1]) {
        if (findSegmentWithinSegment(signalMap[4], signal)) {
          signalMap[9] = signal;
        } else if (signal.length === 6) {
          if (findSegmentWithinSegment(signalMap[1], signal))
            signalMap[0] = signal;
          else signalMap[6] = signal;
        } else if (signal.length === 5) {
          if (findSegmentWithinSegment(signalMap[7], signal)) {
            signalMap[3] = signal;
          } else {
            const subtraction = segmentSubtract(signalMap[4], signal);

            if (subtraction.length === 3) signalMap[2] = signal;
            else signalMap[5] = signal;
          }
        }
      }
    }
  }

  return signalMap;
}

function decodeSignal(mapping, signal) {
  for (let m = 0; m < mapping.length; m++) {
    if (
      JSON.stringify(mapping[m].split("").sort()) ===
      JSON.stringify(signal.split("").sort())
    ) {
      return m;
    }
  }
}

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const lines = input
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split(" | "));

  let totalNumber = 0;

  for (let line of lines) {
    const input = line[0];
    const output = line[1];
    const mapping = buildMapFromInput(input);

    let outputNumber = "";
    for (let signal of output.split(" ")) {
      outputNumber += decodeSignal(mapping, signal);
    }

    totalNumber += parseInt(outputNumber);
  }

  console.log(totalNumber);
}

main();
