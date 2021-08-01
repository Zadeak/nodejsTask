import * as database from "./database/database";
import {
  asyncWriteAirportsDataFromFile,
  asyncWriteRoutesDataFromFile,
  populateRoutesDb,
} from "./PopulateDb";

import { dijkstra } from "graphology-shortest-path";
import { counter } from "./PopulateDb";
import Graph from "graphology"; // may be problems?
import {
  calculateDistance,
  delay,
  getCoorinates,
  readPath,
} from "./helperfunctions";

(async () => {
  console.log(new Date());
  await asyncWriteAirportsDataFromFile();
  await asyncWriteRoutesDataFromFile();
  while (counter < 67000) {
    await delay(1000);
  }
  var route = await database.getRoute("2965");

  const start = await database.getAirportIdByCode("AYGA");
  const stop = await database.getAirportIdByCode("MAG");

  var path = await test(4, start.toString(), stop.toString());
  if (path.includes("path from")) {
    console.log("path is not possible with 3 stops");
  } else {
    var distance = await readPath(path.split(","));
    console.log(distance + " KM");
  }
  console.log(new Date());
})();

export async function test(
  depth: number,
  startingPoint: string,
  endpoint: string
) {
  const graph = new Graph();

  var depthCounter = 0;
  var tempListSize = 0;

  const startPoint = await database.getRoute(startingPoint);

  var nodeList: Array<Route> = [startPoint];
  var tempList: Array<Route> = [];
  graph.addNode(startPoint.StartAirportId);

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

        var coordinates = await getCoorinates(entry.StartAirportId, route);

        //move to fun?
        graph.addEdge(entry.StartAirportId, route, {
          weight: calculateDistance({coordinates}),
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
            startPoint.StartAirportId,
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
