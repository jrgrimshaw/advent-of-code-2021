const fs = require("fs").promises;

async function main() {
  console.time("perf");

  const input = await fs.readFile("input.txt", "utf8");
  const initialSchool = input.split("\n")[0].split(",");

  const DAYS_FOR_MODEL = 256; // 80 for part1 (8ms), 256 for part2 (11ms)
  let schoolModel = {};

  for (let fishTimer of initialSchool) {
    schoolModel[fishTimer] = (schoolModel[fishTimer] || 0) + 1;
  }

  for (let d = 0; d < DAYS_FOR_MODEL; d++) {
    let currentDayModel = { ...schoolModel };

    for (let daysLeft in schoolModel) {
      if (daysLeft != 0) {
        currentDayModel[daysLeft - 1] = schoolModel[daysLeft];
        currentDayModel[daysLeft] = 0;
      }
    }

    if (schoolModel[0]) {
      currentDayModel[6] = (currentDayModel[6] || 0) + schoolModel[0];
      currentDayModel[8] = schoolModel[0];
    }

    schoolModel = currentDayModel;

    let totalFish = 0;
    for (let daysLeft in schoolModel) {
      totalFish += schoolModel[daysLeft];
    }

    console.log(`day${d + 1}`, `(${totalFish} total)`);
  }

  console.timeEnd("perf");
}

main();
