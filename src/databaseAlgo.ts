import * as jsGraph from "js-graph-algorithms";
import * as database from "./database";
import {
  asyncWriteAirportsDataFromFile,
  asyncWriteRoutesDataFromFile,
  populateRoutesDb,
} from "./PopulateDb";
import * as fs from "fs";

const geodist = require("geodist");
import { dijkstra } from "graphology-shortest-path";

import Graph from "graphology"; // may be problems?

(async () => {
  console.log(new Date());
  await populateRoutesDb();
  await asyncWriteAirportsDataFromFile();

  var route = await database.getRoute("6337");
  console.log(route);
  //503, 2912,9823 - not found
  var path = await test(5, route, "2912");
  if (path.includes("path to")) {
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
