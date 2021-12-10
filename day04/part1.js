const fs = require("fs").promises;

function checkWinner(bingoBoard) {
  for (let r = 0; r < bingoBoard.length; r++) {
    let rowMarkedNums = 0,
      columnMarkedNums = 0;

    for (let n = 0; n < bingoBoard[r].length; n++) {
      if (bingoBoard[r][n].marked) rowMarkedNums++;
      if (bingoBoard[n][r].marked) columnMarkedNums++;
    }

    if (rowMarkedNums === bingoBoard.length) return true;
    if (columnMarkedNums === bingoBoard.length) return true;
  }
}

function drawNumbers(bingoNumbers, bingoBoards) {
  // Draw numbers
  for (let bingoNumber of bingoNumbers) {
    for (let b = 0; b < bingoBoards.length; b++) {
      for (let r = 0; r < bingoBoards[b].length; r++) {
        for (let n = 0; n < bingoBoards[b][r].length; n++) {
          if (bingoBoards[b][r][n].num === bingoNumber) {
            bingoBoards[b][r][n].marked = true;

            if (checkWinner(bingoBoards[b])) {
              return {
                winningBoard: bingoBoards[b],
                winningNumber: bingoNumber,
              };
            }
          }
        }
      }
    }
  }
}

async function main() {
  const input = await fs.readFile("input.txt", "utf8");

  const bingoNumbers = input.split("\n")[0].split(",");

  // Convert remainder of text file into multidimension arrays
  let bingoBoards = input
    .split("\n\n")
    .slice(1)
    .map((board) =>
      board
        .split("\n")
        .filter((row) => row.length)
        .map((row) =>
          row
            .split(" ")
            .filter((num) => num)
            .map((num) => ({ num, marked: false }))
        )
    );

  const { winningBoard, winningNumber } = drawNumbers(
    bingoNumbers,
    bingoBoards
  );

  let unmarkedNumbersSum = 0;
  for (let r = 0; r < winningBoard.length; r++) {
    for (let n = 0; n < winningBoard[r].length; n++) {
      if (!winningBoard[r][n].marked)
        unmarkedNumbersSum += parseInt(winningBoard[r][n].num);
    }
  }

  console.log(unmarkedNumbersSum * winningNumber);
}

main();
