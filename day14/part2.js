const fs = require("fs").promises;

async function main() {
  const input = await fs.readFile("input.txt", "utf8");

  // convert insertion rules into map
  const insertionRules = input.split("\n\n")[1].split("\n").filter(Boolean);
  let pairMap = {};
  let ceMap = [];
  for (let rule of insertionRules) {
    let pair = rule.split(" -> ")[0];
    let np = rule.split(" -> ")[1];

    pairMap[pair] = {
      count: 0,
      poly: np,
      newPairs: [pair.split("")[0] + np, np + pair.split("")[1]],
    };
  }

  // find pairs in polymer template, and add them to the map
  const polymerTemplate = input.split("\n\n")[0].split("");
  for (let p = 0; p < polymerTemplate.length; p++) {
    if (p + 1 < polymerTemplate.length) {
      const pair = `${polymerTemplate[p]}${polymerTemplate[p + 1]}`;
      pairMap[pair].count++;
    }

    if (!ceMap[polymerTemplate[p]]) ceMap[polymerTemplate[p]] = 0;
    ceMap[polymerTemplate[p]] += 1;
  }

  // run simulation
  const STEPS = 40;

  for (let s = 0; s < STEPS; s++) {
    let tempPairMap = JSON.parse(JSON.stringify(pairMap)); // javascript sucks

    for (let pair in pairMap) {
      const { count, poly, newPairs } = pairMap[pair];

      if (count) {
        if (!ceMap[poly]) ceMap[poly] = 0;
        ceMap[poly] += count;

        for (let newPair of newPairs) {
          tempPairMap[newPair].count += count;
        }

        tempPairMap[pair].count -= count;
      }
    }

    const mc = Math.max(...Object.values(ceMap));
    const lc = Math.min(...Object.values(ceMap));

    console.log(`step${s}`, mc - lc);

    pairMap = tempPairMap;
  }
}

main();
