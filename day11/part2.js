const fs = require("fs").promises;

function octopusFlash(octoMatrix, i, j) {
  octoMatrix[i][j] = 0;

  // adjacent cells
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      if (di === 0 && dj === 0) continue;
      if (octoMatrix[i + di] && octoMatrix[i + di][j + dj]) {
        octoMatrix[i + di][j + dj]++;

        if (octoMatrix[i + di][j + dj] > 9) {
          octopusFlash(octoMatrix, i + di, j + dj);
        }
      }
    }
  }
}

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const octoMatrix = input
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("").map(Number));

  const STEPS = 1000;

  for (let s = 0; s < STEPS; s++) {
    for (let i = 0; i < octoMatrix.length; i++) {
      for (let j = 0; j < octoMatrix[i].length; j++) {
        octoMatrix[i][j]++;
      }
    }

    for (let i = 0; i < octoMatrix.length; i++) {
      for (let j = 0; j < octoMatrix[i].length; j++) {
        if (octoMatrix[i][j] > 9) octopusFlash(octoMatrix, i, j);
      }
    }

    let numOfSimultaneousFlashes = 0;
    for (let i = 0; i < octoMatrix.length; i++) {
      for (let j = 0; j < octoMatrix[i].length; j++) {
        if (octoMatrix[i][j] === 0) numOfSimultaneousFlashes++;
      }
    }

    if (numOfSimultaneousFlashes === 100) {
      console.log("step", s + 1);
      break;
    }
  }
}

main();
