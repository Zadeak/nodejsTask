import { rejects } from "assert";
import * as fs from "fs";
import { resolve } from "path/posix";
import * as rd from "readline";
import * as database from "./database";

//TODO: refactor to function
var airportsReader = rd.createInterface(
  fs.createReadStream("src/resources/airports.dat.txt")
);
var routesReader = rd.createInterface(
  fs.createReadStream("src/resources/routes.dat.txt")
);


export function asyncWriteAirportsDataFromFile(): Promise<void> {
    return new Promise((resolve, rejects) => {
      airportsReader.on("line", (l: string) => {
        var tokens = l.split(",");
        var nr = parseInt(tokens[0]);
        var name = tokens[1];
        var city = tokens[2];
        var country = tokens[3];
        var iata = tokens[4];
        var icao = tokens[5];
        var latitude = tokens[6];
        var longitude = tokens[7];
        database.airportsDb.put(nr.toString(), {
          Id: nr,
          Name: name,
          City: city,
          Country: country,
          IATA: iata,
          ICAO: icao,
          Latitude: +latitude,
          Longitude: +longitude,
        });
      });
      resolve();
    });
  }
  
  export function asyncWriteRoutesDataFromFile(): Promise<void> {
    return new Promise((resolve, rejects) => {
      routesReader.on("line", (l: string) => {
        var tokens = l.split(",");
        var startAirportId = tokens[3];
        var destinationAirportId = tokens[5];
        database.routesDb.put(l, {
          StartAirportId: startAirportId,
          DestinationAirportId: destinationAirportId,
        });
      });
      resolve();
    });
  }







// export const writeAirport = new Promise((resolve, reject) => {
//   resolve("write succesfull");
//   airportsReader.on("line", (l: string) => {
//     var tokens = l.split(",");
//     var nr = parseInt(tokens[0]);
//     var name = tokens[1];
//     var city = tokens[2];
//     var country = tokens[3];
//     var iata = tokens[4];
//     var icao = tokens[5];
//     var latitude = tokens[6];
//     var longitude = tokens[7];
//     database.airportsDb.put(nr.toString(), {
//       Id: nr,
//       Name: name,
//       City: city,
//       Country: country,
//       IATA: iata,
//       ICAO: icao,
//       Latitude: +latitude,
//       Longitude: +longitude,
//     });
//   });
// });

// export function writeAirportsDataFromFile(): Promise<void> {
//   let resolveRef;
//   let rejectRef;

//   let dataPrimise: Promise<void> = new Promise((resolve, reject) => {
//     resolveRef = resolve;
//     rejectRef = reject;
//   });
//   airportsReader.on("line", (l: string) => {
//     var tokens = l.split(",");
//     var nr = parseInt(tokens[0]);
//     var name = tokens[1];
//     var city = tokens[2];
//     var country = tokens[3];
//     var iata = tokens[4];
//     var icao = tokens[5];
//     var latitude = tokens[6];
//     var longitude = tokens[7];
//     database.airportsDb.put(nr.toString(), {
//       Id: nr,
//       Name: name,
//       City: city,
//       Country: country,
//       IATA: iata,
//       ICAO: icao,
//       Latitude: +latitude,
//       Longitude: +longitude,
//     });
//   });

//   //   database.airportsDb.forEach((data) => console.log(data));
//   return dataPrimise;
// }



// type Route = {
//     StartAirportId: string;
//     DestinationAirportId: string;
//   };

// people.put("John", { firstname: "John", lastname: "Doe", age: 32 });
