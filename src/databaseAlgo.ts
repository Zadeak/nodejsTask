import * as database from "./database/databasePersistence";
import {
  asyncWriteAirportsDataFromFile,
  asyncWriteRoutesDataFromFile,
  counter
} from "./service/data/dataLoader";

import {loadData} from "./service/data/dataLoaderService";
import { dijkstra } from "graphology-shortest-path";
import Graph from "graphology"; // may be problems?
import {
  calculateDistance,
  delay,
  getCoorinates,
  readPath,
  resolvePath,
} from "./helperfunctions";
import { findPath } from "./service/api/graphAlgorithm";

(async () => {
  console.log(new Date());
  await loadData();
  var route = await database.getRoute("2965");
  console.log(route);

  const start = await database.getAirportIdByCode("ASF");
  const stop = await database.getAirportIdByCode("EGLL");


  var path = await findPath(4, start.toString(),stop.toString())
  // var path = await test(4, start.toString(), stop.toString());


  // if (path.includes("path from")) {
  //   console.log("path is not possible with 3 stops");
  // } else {
  //   var distance = await readPath(path.split(","));
  //   console.log(distance + " KM");
  // }
  await resolvePath(path);
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

        var newRoute: Route;
        try {
          newRoute = await database.getRoute(route);
        } catch (error) {
          console.log("route:" + route + "does not have any other routes to go to")
          continue;
        }
        var coordinates: Coordinates;

        try {
          coordinates = await getCoorinates(entry.StartAirportId, route);
          graph.addEdge(entry.StartAirportId, route, {
            weight: calculateDistance({coordinates}),
          });
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
            continue;
          }
        } catch (error) {
          console.log("airport is absent in airport.dat by airportId in routes.dat file")
          coordinates = {firstlat:1, firstlon:1,secondlat:1,secondlon:1};
        }
        if( coordinates.firstlat === 1 && coordinates.firstlon===1 && coordinates.secondlat===1){
          continue;
        }
      }
    }

    var tempListSize = tempList.length;
    nodeList.push.apply(nodeList, tempList);
    tempList = [];
    depthCounter++;
    console.log("DEPTHCOUNTER"+depthCounter)
  }
  //check if path exist
  return `path from ${startingPoint} to ${endpoint} is not found`;
}
