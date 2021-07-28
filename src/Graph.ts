const jsgraphs = require("js-graph-algorithms");
import * as jsGraph from "js-graph-algorithms";
const testArray = [[0,1,5.0],[1,2,3.0],[2,4,5.0]];

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

export function showData(graph: jsGraph.WeightedDiGraph ,lastNode: number): void {
  var newGraph = graph;
  var dijkstra: jsGraph.Dijkstra = new jsGraph.Dijkstra(newGraph, 0);
  var path = dijkstra.pathTo(lastNode);
  if (dijkstra.hasPathTo(lastNode) && path.length < 4) {
    console.log("=====path from 0 to " + lastNode + " start==========");
    for (var i = 0; i < path.length; ++i) {
      var e = path[i];
      console.log(e.from() + " => " + e.to() + ": " + e.weight);
    }
    console.log("=====path from 0 to " + lastNode + " end==========");
    console.log(
      "=====distance: " + dijkstra.distanceTo(lastNode) + "========="
    );
  } else {
    console.log(
      `path to node ${lastNode} is absent or it takes more than 3 flight`
    );
  }
}

// showData(g,3);


