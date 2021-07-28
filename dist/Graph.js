"use strict";
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
exports.showData = void 0;
const jsgraphs = require("js-graph-algorithms");
const jsGraph = __importStar(require("js-graph-algorithms"));
const testArray = [[0, 1, 5.0], [1, 2, 3.0], [2, 4, 5.0]];
var g = new jsGraph.WeightedDiGraph(testArray.length);
// for (const testArrayData of testArray){
//   const from = testArrayData[0];
//   const newLocal = testArrayData[1];
//   const dist = testArrayData[2];
//   g.addEdge(new jsGraph.Edge(from, newLocal,dist))
// }
// var g = new jsGraph.WeightedDiGraph(8);
g.addEdge(new jsGraph.Edge(0, 1, 5.0));
g.addEdge(new jsGraph.Edge(1, 2, 9.0));
g.addEdge(new jsGraph.Edge(2, 3, 8.0));
// g.addEdge(new jsGraph.Edge(1, 2, 12.0));
// g.addEdge(new jsGraph.Edge(1, 3, 15.0));
// g.addEdge(new jsGraph.Edge(1, 7, 4.0));
// g.addEdge(new jsGraph.Edge(2, 3, 3.0));
// g.addEdge(new jsGraph.Edge(2, 6, 11.0));
// g.addEdge(new jsGraph.Edge(3, 6, 9.0));
// g.addEdge(new jsGraph.Edge(4, 5, 5.0));
// g.addEdge(new jsGraph.Edge(4, 6, 20.0));
// g.addEdge(new jsGraph.Edge(4, 7, 5.0));
// g.addEdge(new jsGraph.Edge(5, 2, 1.0));
// g.addEdge(new jsGraph.Edge(5, 6, 13.0));
// g.addEdge(new jsGraph.Edge(7, 5, 6.0));
// g.addEdge(new jsGraph.Edge(7, 2, 7.0));
function showData(graph, lastNode) {
    var newGraph = graph;
    var dijkstra = new jsGraph.Dijkstra(newGraph, 0);
    var path = dijkstra.pathTo(lastNode);
    if (dijkstra.hasPathTo(lastNode) && path.length < 4) {
        console.log("=====path from 0 to " + lastNode + " start==========");
        for (var i = 0; i < path.length; ++i) {
            var e = path[i];
            console.log(e.from() + " => " + e.to() + ": " + e.weight);
        }
        console.log("=====path from 0 to " + lastNode + " end==========");
        console.log("=====distance: " + dijkstra.distanceTo(lastNode) + "=========");
    }
    else {
        console.log(`path to node ${lastNode} is absent or it takes more than 3 flight`);
    }
}
exports.showData = showData;
// showData(g,3);
//# sourceMappingURL=Graph.js.map