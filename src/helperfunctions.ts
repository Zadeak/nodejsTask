import * as database from "./database";
const geodist = require("geodist");
import Graph from "graphology"; // may be problems?

export async function readPath(stringArray: string[]) {
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

export function calculateDistance(
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

export async function getCoorinates(
  startingPoint: string,
  destinationPoint: string
) {
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

export async function addEdges(graph: Graph, point: Route) {
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
