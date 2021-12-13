const fs = require("fs").promises;

let graph = [];
let allPaths = [];

function isSmallCave(str) {
  return str == str.toLowerCase() && str != str.toUpperCase();
}

function dfs(v, dest, visited, localPathList, smallCaveVisitedTwice) {
  if (v === dest) {
    allPaths.push(localPathList.join(","));
    return;
  }

  visited[v]++;
  if (isSmallCave(v) && visited[v] > 1) {
    smallCaveVisitedTwice = true;
  }

  for (let e = 0; e < graph[v].length; e++) {
    if (graph[v][e] === "start") continue;
    if (
      isSmallCave(graph[v][e]) &&
      smallCaveVisitedTwice &&
      visited[graph[v][e]] >= 1
    ) {
      continue;
    }

    localPathList.push(graph[v][e]);
    dfs(graph[v][e], dest, visited, localPathList, smallCaveVisitedTwice);
    localPathList.pop();
  }

  visited[v]--;
}

function printAllPaths(start, dest) {
  let visited = new Array(graph.length);
  for (let node in graph) {
    visited[node] = 0;
  }

  // run depth first search
  dfs(start, dest, visited, [start], false);
}

async function main() {
  console.time("perf");
  const input = await fs.readFile("input.txt", "utf8");

  // create graph
  for (let r of input.split("\n").filter(Boolean)) {
    const a = r.split("-")[0];
    const b = r.split("-")[1];

    if (!graph[a]) graph[a] = [];
    graph[a].push(b);

    if (!graph[b]) graph[b] = [];
    graph[b].push(a);
  }

  printAllPaths("start", "end");
  console.log(allPaths.length);
  console.timeEnd("perf");
}

main();
