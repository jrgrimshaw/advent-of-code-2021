const fs = require("fs").promises;

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const lines = input.split("\n").map((l) => l && l.split(" | ")[1]);

  let qty = 0;

  for (let line of lines) {
    let words = line.split(" ");

    for (let word of words) {
      if ([2, 3, 4, 7].includes(word.length)) qty++;
    }
  }

  console.log(qty);
}

main();
