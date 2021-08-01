import * as database from "./database/database";
const geodist = require("geodist");
import Graph from "graphology"; // may be problems?

export async function readPath(stringArray: string[]) {
  var LenghtCounter;
  // TODO: maybe it is better to save a->b in km in database as table?
  for (var indexof = 0; indexof < stringArray.length - 1; indexof++) {
    const from = stringArray[indexof];
    const to = stringArray[indexof + 1];
    console.log("From: " + from + "To: " + to);
    var coordinates = await getCoorinates(from, to);
    const distance = calculateDistance({ coordinates });
    LenghtCounter = +distance;
  }
  return LenghtCounter?.toFixed(2);
}

export function calculateDistance({
  coordinates,
}: {
  coordinates: Coordinates;
}) {
  return geodist(
    { lat: coordinates.firstlat, lon: coordinates.firstlon },
    { lat: coordinates.secondlat, lon: coordinates.secondlon },
    { exact: true, unit: "km" }
  );
}

export async function getCoorinates(
  startingPoint: string,
  destinationPoint: string
): Promise<Coordinates> {
  var startAirport = await database.getAirportDataById(
    Number.parseInt(startingPoint)
  );
  var destAirport = await database.getAirportDataById(
    Number.parseInt(destinationPoint)
  );
  var firstlat = startAirport.Latitude;
  var firstlon = startAirport.Longitude;
  var secondlat = destAirport.Latitude;
  var secondlon = destAirport.Longitude;
  return { firstlat, firstlon, secondlat, secondlon };
}

export async function addEdges(graph: Graph, point: Route) {
  for (var it of point.DestinationAirportId) {
    graph.addNode(it);

    var coordinates = await getCoorinates(point.StartAirportId, it);
    graph.addEdge(point.StartAirportId, it, {
      weight: calculateDistance({ coordinates }),
    });
  }
}
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
