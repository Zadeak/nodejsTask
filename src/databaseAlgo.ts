import * as jsGraph from "js-graph-algorithms";
import * as database from "./database";
import {
  asyncWriteAirportsDataFromFile,
  asyncWriteRoutesDataFromFile,
} from "./PopulateDb";
import * as fs from "fs";
import { showData } from "./Graph";

const geodist = require("geodist");
import { dijkstra } from "graphology-shortest-path";

import Graph from "graphology"; // may be problems?

async function readPath(stringArray: string[]) {
  var LenghtCounter;
  // TODO: maybe it is better to save a->b in km in database as table?
  for (var indexof = 0; indexof < stringArray.length - 1; indexof++) {
    const from = stringArray[indexof];
    const to = stringArray[indexof + 1];
    console.log("From: " + from + "To: " + to);
    var { startAirportLat, startAirportLon, destAirportLat, destAirportLon } =
      await getCoorinates(from, to);
    const distance = calculateDistance(
      startAirportLat,
      startAirportLon,
      destAirportLat,
      destAirportLon
    );
    LenghtCounter = +distance;
  }
  return LenghtCounter;
}

(async () => {
  await asyncWriteRoutesDataFromFile();
  await asyncWriteAirportsDataFromFile();

  var route = await database.getRoute("2966");
  //503, 2912,9823 - not found
  var path = await test(3, route, "2990");
  var distance = await readPath(path.split(","));
  console.log(distance);
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

        if (route === "9823") {
          console.log("Checking for 9823");
        }
        try {
          var newRoute: Route = await database.getRoute(route);
        } catch (error) {
          console.log(error);
          console.log(route);
          return "";
        }

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

        tempList.push(newRoute);
        //move to function
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
  return dijkstra
    .bidirectional(graph, startingPoint.StartAirportId, endpoint, "weight")
    .toString();
}

async function getCoorinates(startingPoint: string, destinationPoint: string) {
  var startAirport = await database.getAirportDataById(
    Number.parseInt(startingPoint)
  );
  var destAirport = await database.getAirportDataById(
    Number.parseInt(destinationPoint)
  );
  var startAirportLat = startAirport.Latitude;
  var startAirportLon = startAirport.Longitude;
  var destAirportLat = destAirport.Latitude;
  var destAirportLon = destAirport.Longitude;
  return { startAirportLat, startAirportLon, destAirportLat, destAirportLon };
}

function calculateDistance(
  firstLat: number,
  firstLon: number,
  secondlat: number,
  secondLon: number
): number {
  return geodist(
    { lat: firstLat, lon: firstLon },
    { lat: secondlat, lon: secondLon },
    { exact: true, unit: "km" }
  );
}

async function addEdges(graph: Graph, point: Route) {
  for (var it of point.DestinationAirportId) {
    graph.addNode(it);

    var { startAirportLat, startAirportLon, destAirportLat, destAirportLon } =
      await getCoorinates(point.StartAirportId, it);
    graph.addEdge(point.StartAirportId, it, {
      weight: calculateDistance(
        startAirportLat,
        startAirportLon,
        destAirportLat,
        destAirportLon
      ),
    });
  }
}
