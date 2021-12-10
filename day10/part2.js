const fs = require("fs").promises;

async function main() {
  const input = await fs.readFile("input.txt", "utf8");

  const lines = input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""));

  const chunkDelimiters = [
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
    ["<", ">"],
  ];
  const autoCompleteScores = [];

  for (let l = 0; l < lines.length; l++) {
    const openChunks = [];

    try {
      for (let char of lines[l]) {
        for (let [open, close] of chunkDelimiters) {
          if (char === open) openChunks.push(open);

          if (char === close) {
            if (openChunks[openChunks.length - 1] === open) openChunks.pop();
            else {
              delete lines[l];
              throw new Error();
            }
          }
        }
      }

      let autoCompleteScore = 0;
      for (let char of openChunks.reverse()) {
        switch (char) {
          case "(":
            autoCompleteScore = autoCompleteScore * 5 + 1;
            break;
          case "[":
            autoCompleteScore = autoCompleteScore * 5 + 2;
            break;
          case "{":
            autoCompleteScore = autoCompleteScore * 5 + 3;
            break;
          case "<":
            autoCompleteScore = autoCompleteScore * 5 + 4;
            break;
          default:
            break;
        }
      }

      autoCompleteScores.push(autoCompleteScore);
    } catch (e) {}
  }

  autoCompleteScores.sort((a, b) => b - a);
  console.log(autoCompleteScores);
  console.log(
    "median",
    autoCompleteScores[Math.floor(autoCompleteScores.length / 2)]
  );
}

main();
