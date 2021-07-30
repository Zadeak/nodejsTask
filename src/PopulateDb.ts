import { rejects } from "assert";
import { Depot } from "depot-db";
import * as fs from "fs";
import { resolve } from "path/posix";
import * as rd from "readline";
import * as database from "./database";

// TODO: refactor to function
// var airportsReader = rd.createInterface(
//   fs.createReadStream("../src/resources/airports.dat.txt")
// );
// var routesReader = rd.createInterface(
//   fs.createReadStream("../src/resources/routes.dat.txt")
// );

function createStreamReader(path: string) {
  return rd.createInterface(fs.createReadStream(path));
}

export function asyncWriteAirportsDataFromFile(): Promise<void> {
  return new Promise((resolve) => {
    createStreamReader("./src/resources/airports.dat.txt").on(
      "line",
      (l: string) => {
        var tokens = l.split(",");
        var nr = parseInt(tokens[0]);
        var name = tokens[1];
        var city = tokens[2];
        var country = tokens[3];
        var iata = tokens[4].slice(1, 4);
        var icao = tokens[5].slice(1, 5);
        var latitude = tokens[6];
        var longitude = tokens[7];
        database.airportsDAO.put(nr.toString(), {
          Id: nr,
          Name: name,
          City: city,
          Country: country,
          IATA: iata,
          ICAO: icao,
          Latitude: +latitude,
          Longitude: +longitude,
        });
      }
    );
    resolve();
  });
}

// export function asyncWriteRoutesDataFromFile(): Promise<void> {
//   return new Promise((resolve, rejects) => {
//     createStreamReader("./src/resources/routes.dat.txt").on(
//       "line",
//       (l: string) => {
//         var tokens = l.split(",");
//         var startAirportId = tokens[3];
//         var destinationAirportId = tokens[5];
//         database.routesDAO.put(startAirportId, {
//           StartAirportId: startAirportId,
//           DestinationAirportId: destinationAirportId,
//         });
//       }
//     );
//     resolve();
//   });
// }

export async function asyncWriteRoutesDataFromFile(): Promise<void> {
  createStreamReader("./src/resources/routes.dat.txt").on(
    "line",
    (l: string) => {
      var tokens = l.split(",");
      var startAirportId = tokens[3];
      var destinationAirportId = tokens[5];
      database.writeRoutes(startAirportId, destinationAirportId);
    }
  );
  // rejects(console.log("what"));
}
// -------------------------------------------------
function readFile(filePath: string) {
  return fs.readFileSync(filePath, "utf-8");
}

export async function populateRoutesDb() {
  const newLocal = readFile("./src/resources/routes.dat.txt");
  const lineArray = newLocal.split("\n");
  for (var line of lineArray) {
    var tokens = line.split(",");
    var startAirportId = tokens[3];

    var destinationAirportId = tokens[5];
    if (startAirportId === undefined) {
      continue;
    }
    database.routesDAO.put(startAirportId, {
      StartAirportId: startAirportId,
      DestinationAirportId: destinationAirportId,
    });
  }
}
// export function asyncWriteRoutesDataFromFile(): Promise<void> {
//   return new Promise((resolve, rejects) => {
//     createStreamReader("./src/resources/routes.dat.txt").on(
//       "line",
//       (l: string) => {
//         var tokens = l.split(",");
//         var startAirportId = tokens[3];
//         var destinationAirportId = tokens[5];
//         database.writeRoutes(startAirportId, destinationAirportId);
//       }
//     );
//     resolve();
//     // rejects(console.log("what"));
//   });
// }
