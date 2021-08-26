import { dijkstra } from "graphology-shortest-path";
import Graph from "graphology";
import { text } from "express";

// const graph = new Graph();

// // // graph.addNode("1");
// // // graph.addNode("2");
// // // graph.addNode("3");
// // // graph.addNode("4");
// // // graph.addNode("5");

// graph.mergeEdge("1", "2", { weight: 1 });
// graph.mergeEdge("2", "3", { weight: 1 });
// graph.mergeEdge("2", "4", { weight: 1 });
// graph.mergeEdge("4", "2", { weight: 1 });
// graph.mergeEdge("3", "2", { weight: 1 });
// graph.mergeEdge("3", "4", { weight: 1 });
// graph.mergeEdge("4", "3", { weight: 1 });
// graph.mergeEdge("4", "5", { weight: 1 });

// // const path = dijkstra.singleSource(graph, "1", "weight");
// const path = dijkstra.bidirectional(graph, "1", "5", "weight");
// console.log(path);

// -------------------------------
// algo for creating graph
type endPoint = {
  key: string;
  value: Number;
};
const adj: any = {
  a: [
    { key: "b", value: 1 },
    { key: "c", value: 2 },
  ],
  b: [
    { key: "a", value: 1 },
    { key: "c", value: 3 },
    { key: "d", value: 4 },
    { key: "f", value: 5 },
  ],
  c: [
    { key: "a", value: 2 },
    { key: "q", value: 4 },
  ],
  d: [{ key: "f", value: 6 }],
  f: [{ key: "w", value: 4 }],
  q: [{ key: "f", value: 4 }],
  w: [{ key: "e", value: 4 }],
  e: [{ key: "r", value: 4 }],
  r: [{ key: "t", value: 4 }],
  t: [{ key: "y", value: 4 }],
  y: [{ key: "u", value: 4 }],
  u: [{ key: "i", value: 4 }],
  i: [{ key: "g", value: 4 }],
};
// console.log(path);
export function constructGrap(toVisitList: Array<string>, graph: Graph, visited: Set<string>, depth: number, adj: any): Graph {
  if (depth === 10) return graph;
  let current = toVisitList;
  toVisitList = [];

  for (let tovisit of current) {
    var neighbors: Array<endPoint> = adj[tovisit];
    for (let neighbor of neighbors) {
      graph.mergeEdge(tovisit, neighbor.key, { weight: neighbor.value });
      if (!visited.has(neighbor.key)) {
        toVisitList.push(neighbor.key);
      }
    }
    visited.add(tovisit);
  }
  depth++;
  return constructGrap(toVisitList, graph, visited, depth, adj);
}
const toVisit = ["a"];
const graph2 = new Graph();
const visited = new Set<string>();

const testing = constructGrap2(toVisit, graph2, visited, 0, adj);
console.log(testing);

const path = dijkstra.bidirectional(testing, "a", "g", "weight");
console.log(path);

export function constructGrap2(toVisitList: Array<string>, graph: Graph, visited: Set<String>, depth: number = 0, adj: any): Graph {
  if (depth === 5) return graph;
  let current = toVisitList;
  toVisitList = [];

  // const startPoint = await database.getRoute(toVisitList[0]);
  // const startPoint = await database.getRoute(toVisitList[0]);
  for (let tovisit of current) {
    if (visited.has(tovisit)) {
      continue;
    }
    var neig: Array<endPoint> = adj[tovisit];
    // var neighbors: Array<pointAndWeight> = adj[tovisit];
    for (let neighbor of neig) {
      graph.mergeEdge(tovisit, neighbor.key, { weight: neighbor.value });
      if (!visited.has(neighbor.key)) {
        toVisitList.push(neighbor.key);
      }
    }
    visited.add(tovisit);
  }
  depth++;
  return constructGrap2(toVisitList, graph, visited, depth, adj);
}
