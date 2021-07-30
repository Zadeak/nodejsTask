"use strict";
// import { dijkstra } from "graphology-shortest-path";
// import Graph from "graphology";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const fs = __importStar(require("fs"));
const rd = __importStar(require("readline"));
const database_1 = require("./database");
var airportsReader = rd.createInterface(fs.createReadStream("./src/resources/airports.dat.txt"));
var routesReader = rd.createInterface(fs.createReadStream("./src/resources/routes.dat.txt"));
routesReader.on("line", (l) => {
    var tokens = l.split(",");
    var startAirportId = tokens[3];
    var destinationAirportId = tokens[5];
    if (startAirportId === undefined) {
        console.log("true");
        return;
    }
    database_1.routesDAO.put(l, {
        StartAirportId: startAirportId.toString(),
        DestinationAirportId: destinationAirportId,
    });
});
database_1.routesDAO
    .find({ where: (route) => route.StartAirportId === "2966" })
    .then((data) => {
    console.log(data);
});
console.log("what");
//# sourceMappingURL=testGround.js.map