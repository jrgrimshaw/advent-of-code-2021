const fs = require("fs").promises;

// O(n)
function commonOccurances(arr) {
  let map = [],
    mostCommon = false,
    leastCommon = false;

  for (let i of arr) {
    if (!map[i]) map[i] = 0;
    map[i]++;

    if (!mostCommon || map[i] > map[mostCommon]) mostCommon = i;
    if (!leastCommon || map[i] < map[leastCommon]) leastCommon = i;
  }

  return { mc: map[mostCommon], lc: map[leastCommon] };
}

async function main() {
  const input = await fs.readFile("input.txt", "utf8");

  const polymerTemplate = input.split("\n\n")[0];
  const insertionRules = input.split("\n\n")[1].split("\n").filter(Boolean);

  const STEPS = 10;
  let polymer = polymerTemplate.split("");

  for (let s = 0; s < STEPS; s++) {
    let newPolymer = [...polymer];
    let insertCounter = 0;

    for (let p = 0; p < polymer.length; p++) {
      if (p + 1 < polymer.length) {
        for (let rule of insertionRules) {
          let match = rule.split(" -> ")[0].split("");
          let char = rule.split(" -> ")[1];

          if (polymer[p] === match[0] && polymer[p + 1] === match[1]) {
            newPolymer.splice(p + 1 + insertCounter, 0, char);
            insertCounter++;
          }
        }
      }
    }

    const { mc, lc } = commonOccurances(newPolymer);
    console.log(`step${s}`, newPolymer.length, mc - lc);
    polymer = newPolymer;
    insertCounter = 0;
  }
}

main();
