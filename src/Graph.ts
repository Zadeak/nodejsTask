var jsgraphs = require("js-graph-algorithms");
var g = new jsgraphs.WeightedDiGraph(8);
g.addEdge(new jsgraphs.Edge(0, 1, 5.0));
g.addEdge(new jsgraphs.Edge(0, 4, 9.0));
g.addEdge(new jsgraphs.Edge(0, 7, 8.0));
g.addEdge(new jsgraphs.Edge(1, 2, 12.0));
g.addEdge(new jsgraphs.Edge(1, 3, 15.0));
g.addEdge(new jsgraphs.Edge(1, 7, 4.0));
g.addEdge(new jsgraphs.Edge(2, 3, 3.0));
g.addEdge(new jsgraphs.Edge(2, 6, 11.0));
g.addEdge(new jsgraphs.Edge(3, 6, 9.0));
g.addEdge(new jsgraphs.Edge(4, 5, 5.0));
g.addEdge(new jsgraphs.Edge(4, 6, 20.0));
g.addEdge(new jsgraphs.Edge(4, 7, 5.0));
g.addEdge(new jsgraphs.Edge(5, 2, 1.0));
g.addEdge(new jsgraphs.Edge(5, 6, 13.0));
g.addEdge(new jsgraphs.Edge(7, 5, 6.0));
g.addEdge(new jsgraphs.Edge(7, 2, 7.0));

export function showData(lastNode: number): void {
  var dijkstra = new jsgraphs.Dijkstra(g, 0);
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
