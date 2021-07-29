"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphology_shortest_path_1 = require("graphology-shortest-path");
const graphology_1 = __importDefault(require("graphology"));
// const Graph = require("graphology");
const graph = new graphology_1.default();
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
graph.forEachNode((node) => {
    graph.forEachNeighbor(node, (neighbor) => console.log(node, neighbor));
});
const path = graphology_shortest_path_1.dijkstra.bidirectional(graph, "John", "Methy", "weight");
console.log("he");
console.log(path.toString());
//# sourceMappingURL=testGround.js.map