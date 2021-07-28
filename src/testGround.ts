import { Dijkstra, NodeVertex, Vertex } from "./dijkstra";



var dijkstra = new Dijkstra();


const additionalPoints: NodeVertex[] = [{ nameOfVertex: "C", weight: 3 }, { nameOfVertex: "E", weight: 7 }, { nameOfVertex: "B", weight: 4 }];
var newVertex = new Vertex("A", [], 1);
newVertex.nodes = additionalPoints
dijkstra.addVertex(new Vertex("A", [], 1));
console.log(dijkstra.findShortestWay("A", "C"));


console.log("Progress!");