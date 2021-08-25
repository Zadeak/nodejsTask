import { dijkstra } from "graphology-shortest-path";
import Graph from "graphology";
import { text } from "express";

// const graph = new Graph();

// // graph.addNode("1");
// // graph.addNode("2");
// // graph.addNode("3");
// // graph.addNode("4");
// // graph.addNode("5");

// graph.mergeEdge("1", "2", { weight: 1 });
// graph.mergeEdge("2", "3", { weight: 2 });
// graph.mergeEdge("3", "4", { weight: 3 });
// graph.mergeEdge("4", "5", { weight: 4 });
// graph.mergeEdge("1", "5", { weight: 15 });

// const path = dijkstra.singleSource(graph, "1", "weight");

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

const testing = constructGrap(toVisit, graph2, visited, 0, adj);
console.log(testing);

const path = dijkstra.bidirectional(testing, "a", "g", "weight");
console.log(path);

// const adjS: any = {
//   a: [{ b: 1 }, { c: 2 }],
// };
// const newLocal = adjS["a"];

// console.log(newLocal);

// for (let n of newLocal) {
//   console.log(n);
// }
