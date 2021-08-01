import Graph from "graphology";
import * as database from "../../database/databasePersistence";
import { calculateDistance, getCoorinates,} from "../../helperfunctions";
import { dijkstra } from "graphology-shortest-path";
import { logger } from "../../logger";

export async function findPath( depth: number, startingPoint: string, endpoint: string){
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
          logger.debug("route:" + route + "does not have any other routes to go to");
          continue;
        }
        var coordinates: Coordinates;
        try {
          coordinates = await getCoorinates(entry.StartAirportId, route);
        } catch (error) {
            logger.debug("airport is absent in airport.dat by airportId in routes.dat file");

            coordinates = { firstlat: 1, firstlon: 1, secondlat: 1, secondlon: 1};
        }
        if (
          coordinates.firstlat === 1 &&
          coordinates.firstlon === 1 &&
          coordinates.secondlat === 1
        ) {
          continue;
        }
        //move to fun?
        graph.addEdge(entry.StartAirportId, route, {
          weight: calculateDistance({ coordinates }),
        });

        //move to function

        tempList.push(newRoute);
        try {
          const path = dijkstra.bidirectional(
            graph,
            startPoint.StartAirportId,
            endpoint,
            "weight"
          );
          return {message:path.toString(), codes: [startingPoint,endpoint], steps:depth};
        } catch (error) {
          // console.log("Path cannot be created yet")
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
  return {message: `path from ${startingPoint} to ${endpoint} is not found`, codes: [startingPoint,endpoint], steps:depth};
}
