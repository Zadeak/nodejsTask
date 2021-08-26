import * as database from "./database/databasePersistence";
const geodist = require("geodist");
import Graph from "graphology"; // may be problems?
import { logger } from "./logger";

export async function readPath(stringArray: string[]): Promise<PathResponse> {
  var LenghtCounter: number = 0;
  var airportsCodes = [];

  for (var airportcode of stringArray) {
    var airportData = await database.getAirportDataById(Number.parseInt(airportcode));
    airportsCodes.push("Name: " + airportData.Name + " IATA:" + airportData.IATA + " ICAO:" + airportData.ICAO);
  }
  // TODO: maybe it is better to save a->b in km in database as table?
  for (var indexof = 0; indexof < stringArray.length - 1; indexof++) {
    const from = stringArray[indexof];
    const to = stringArray[indexof + 1];
    var coordinates = await getCoorinates(from, to);
    const distance = calculateDistance({ coordinates });
    LenghtCounter = +distance;
  }
  var totalDistanceString = LenghtCounter.toFixed(2);
  var totalDistance = Number.parseFloat(totalDistanceString);
  return { airportsCodes, totalDistance };
}

export function calculateDistance({ coordinates }: { coordinates: Coordinates }) {
  return geodist({ lat: coordinates.firstlat, lon: coordinates.firstlon }, { lat: coordinates.secondlat, lon: coordinates.secondlon }, { exact: true, unit: "km" });
}

export async function getCoorinates(startingPoint: string, destinationPoint: string): Promise<Coordinates> {
  var startAirport = await database.getAirportDataById(Number.parseInt(startingPoint));
  var destAirport = await database.getAirportDataById(Number.parseInt(destinationPoint));
  var firstlat = startAirport.Latitude;
  var firstlon = startAirport.Longitude;
  var secondlat = destAirport.Latitude;
  var secondlon = destAirport.Longitude;
  return { firstlat, firstlon, secondlat, secondlon };
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function resolvePath({ message, codes }: { message: Array<string>; codes: Array<any> }): Promise<PathResponse> {
  if (message.includes("no path")) {
    logger.debug(`${message}: this path is not possible with 3 stops`);
    const from = await database.getAirportDataById(codes[0]);
    const to = await database.getAirportDataById(codes[1]);

    return { airportsCodes: [`Flight from: ${from.Name}, IATA: '${from.IATA}', ICAO: '${from.ICAO}' to: ${to.Name}, IATA: '${to.IATA}' ICAO: '${to.ICAO}' is not possible with 5 stops`], totalDistance: 0 };
  } else {
    var distanceData = await readPath(message);
    distanceData.airportsCodes.forEach((data: string) => {
      logger.debug(data + "=>");
    });
    logger.debug("Distance:" + distanceData.totalDistance + ":" + " KM");
    var airportsCodes = distanceData.airportsCodes;
    var totalDistance = distanceData.totalDistance;
    return { airportsCodes, totalDistance };
  }
}
