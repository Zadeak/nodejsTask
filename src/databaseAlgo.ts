import * as database from "./database";
import {
  asyncWriteAirportsDataFromFile,
  asyncWriteRoutesDataFromFile,
  populateRoutesDb,
} from "./PopulateDb";

import { dijkstra } from "graphology-shortest-path";
import {counter} from "./PopulateDb";
import Graph from "graphology"; // may be problems?
import { calculateDistance, delay, getCoorinates, readPath } from "./helperfunctions";

(async () => {
  console.log(new Date());


   await asyncWriteRoutesDataFromFile();
  while(counter < 67000 ){
    await delay(1000);
  }
  
  await asyncWriteAirportsDataFromFile();
  var route = await database.getRoute("2965");

  var path = await test(4, route, "2912");
  if (path.includes("path from")) {
    console.log("path is not possible with 3 stops");
  } else {
    var distance = await readPath(path.split(","));
    console.log(distance);
  }
  console.log(new Date());
})();

export async function test(
  depth: number,
  startingPoint: Route,
  endpoint: string
) {
  const graph = new Graph();

  var depthCounter = 0;
  var tempListSize = 0;

  var nodeList: Array<Route> = [startingPoint];
  var tempList: Array<Route> = [];
  graph.addNode(startingPoint.StartAirportId);

  while (depthCounter != depth) {
    for (var entry of nodeList.slice(-tempListSize)) {
      var extractedRoutes = entry.DestinationAirportId;
      for (var route of extractedRoutes) {
        //move to function
        try {
          graph.addNode(route);
        } catch (error) {
          continue;
        }

        var newRoute: Route = await database.getRoute(route);

        var {
          startAirportLat,
          startAirportLon,
          destAirportLat,
          destAirportLon,
        } = await getCoorinates(entry.StartAirportId, route);

        //move to fun?
        graph.addEdge(entry.StartAirportId, route, {
          weight: calculateDistance(
            startAirportLat,
            startAirportLon,
            destAirportLat,
            destAirportLon
          ),
        });

        // if (route === endpoint) {
        //   console.log("added point == endpoint");
        //   try {
        //     const path = dijkstra.bidirectional(
        //       graph,
        //       startingPoint.StartAirportId,
        //       endpoint,
        //       "weight"
        //     );
        //     console.log(path.toString());
        //     return path.toString();
        //   } catch (error) {
        //     // console.log(error);
        //     continue;
        //   }
        // }

        //move to function

        tempList.push(newRoute);
        try {
          const path = dijkstra.bidirectional(
            graph,
            startingPoint.StartAirportId,
            endpoint,
            "weight"
          );
          console.log(path.toString());
          return path.toString();
        } catch (error) {
          // console.log(error);
          continue;
        }
      }
    }

    var tempListSize = tempList.length;
    nodeList.push.apply(nodeList, tempList);
    tempList = [];
    depthCounter++;
  }
  //check if path exist
  return `path from ${startingPoint} to ${endpoint} is not found`;
}
