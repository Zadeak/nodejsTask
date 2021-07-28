"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dijkstra_1 = require("./dijkstra");
var dijkstra = new dijkstra_1.Dijkstra();
const additionalPoints = [{ nameOfVertex: "C", weight: 3 }, { nameOfVertex: "E", weight: 7 }, { nameOfVertex: "B", weight: 4 }];
var newVertex = new dijkstra_1.Vertex("A", [], 1);
newVertex.nodes = additionalPoints;
dijkstra.addVertex(new dijkstra_1.Vertex("A", [], 1));
console.log(dijkstra.findShortestWay("A", "C"));
console.log("Progress!");
//# sourceMappingURL=testGround.js.map