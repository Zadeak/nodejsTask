import { dijkstra } from "graphology-shortest-path";
import Graph from "graphology";

// const Graph = require("graphology");

const graph = new Graph();
var testArr = ["John", "Martha", "Lillian", "Methy"];

for (var arrData of testArr) {
  graph.addNode(arrData);
}
// graph.addNode('John');
// graph.addNode('Martha');
// graph.addNode('Lillian');
// graph.addNode('Methy');

graph.addEdge("John", "Martha", { weight: 1 });
graph.addEdge("John", "Lillian", { weight: 4 });
graph.addEdge("Lillian", "Methy", { weight: 3 });

console.log("Number of nodes", graph.order);
console.log("Number of edges", graph.size);

graph.forEachNode((node: any) => {
  graph.forEachNeighbor(node, (neighbor: any) => console.log(node, neighbor));
});

const path = dijkstra.bidirectional(graph, "John", "Methy", "weight");

console.log("he");
console.log(path.toString());
