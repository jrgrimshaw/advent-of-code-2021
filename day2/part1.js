const fs = require("fs").promises;

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const inputToArray = input.split("\n").filter((val) => val);

  let horizontalPos = 0;
  let depthPos = 0;

  for (let i = 0; i < inputToArray.length; i++) {
    const step = inputToArray[i].split(" ");
    const instruction = step[0];
    const units = parseInt(step[1]);

    if (instruction === "forward") horizontalPos += units;
    if (instruction === "down") depthPos += units;
    if (instruction === "up") depthPos -= units;
  }

  console.log(horizontalPos * depthPos);
}

main();
