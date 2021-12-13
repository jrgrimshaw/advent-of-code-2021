const fs = require("fs").promises;

let graph = [];
let allPaths = [];

function isBigCave(str) {
  return !(str == str.toLowerCase() && str != str.toUpperCase());
}

function dfs(start, dest, isVisited, localPathList) {
  if (start === dest) {
    allPaths.push(localPathList.join(","));
    return;
  }

  isVisited[start] = true;

  for (let i = 0; i < graph[start].length; i++) {
    if (!isVisited[graph[start][i]] || isBigCave(graph[start][i])) {
      localPathList.push(graph[start][i]);
      dfs(graph[start][i], dest, isVisited, localPathList);
      localPathList.pop();
    }
  }

  isVisited[start] = false;
}

function printAllPaths(start, dest) {
  let isVisited = new Array(graph.length);
  for (let i = 0; i < graph.length; i++) isVisited[i] = false;

  // run depth first search
  dfs(start, dest, isVisited, [start]);
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
