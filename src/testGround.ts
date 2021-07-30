// import { dijkstra } from "graphology-shortest-path";
// import Graph from "graphology";

// // const Graph = require("graphology");

// const graph = new Graph();
// var testArr = ["John", "Martha", "Lillian", "Methy"];

// for (var arrData of testArr) {
//   graph.addNode(arrData);
// }
// // graph.addNode('John');
// // graph.addNode('Martha');
// // graph.addNode('Lillian');
// // graph.addNode('Methy');

// graph.addEdge("John", "Martha", { weight: 1 });
// graph.addEdge("John", "Lillian", { weight: 4 });
// graph.addEdge("Lillian", "Methy", { weight: 3 });

// console.log("Number of nodes", graph.order);
// console.log("Number of edges", graph.size);

// graph.forEachNode((node: any) => {
//   graph.forEachNeighbor(node, (neighbor: any) => console.log(node, neighbor));
// });

// const path = dijkstra.bidirectional(graph, "John", "Methy", "weight");

// console.log("he");
// console.log(path.toString());

import * as fs from "fs";
import * as rd from "readline";
import { routesDAO } from "./database";

var airportsReader = rd.createInterface(
  fs.createReadStream("./src/resources/airports.dat.txt")
);
var routesReader = rd.createInterface(
  fs.createReadStream("./src/resources/routes.dat.txt")
);

routesReader.on("line", (l: string) => {
  var tokens = l.split(",");
  var startAirportId = tokens[3];
  var destinationAirportId = tokens[5];
  routesDAO.put(l, {
    StartAirportId: startAirportId.toString(),
    DestinationAirportId: destinationAirportId,
  });
});

routesDAO
  .find({ where: (route) => route.StartAirportId === "2966" })
  .then((data) => {
    console.log(data);
  });

console.log("what");
