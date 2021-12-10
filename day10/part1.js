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
  const invalidChars = [];

  for (let l = 0; l < lines.length; l++) {
    const openChunks = [];

    try {
      for (let char of lines[l]) {
        for (let [open, close] of chunkDelimiters) {
          if (char === open) openChunks.push(open);

          if (char === close) {
            if (openChunks[openChunks.length - 1] === open) openChunks.pop();
            else {
              throw new Error(char);
            }
          }
        }
      }
    } catch (e) {
      invalidChars.push(e.message);
    }
  }

  let syntaxErrScore = 0;
  for (let char of invalidChars) {
    switch (char) {
      case ")":
        syntaxErrScore += 3;
        break;
      case "]":
        syntaxErrScore += 57;
        break;
      case "}":
        syntaxErrScore += 1197;
        break;
      case ">":
        syntaxErrScore += 25137;
        break;
      default:
        break;
    }
  }

  console.log(invalidChars);
  console.log(syntaxErrScore);
}

main();
