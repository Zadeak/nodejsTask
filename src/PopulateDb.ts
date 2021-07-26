import { rejects } from "assert";
import { Depot } from "depot-db";
import * as fs from "fs";
import { resolve } from "path/posix";
import * as rd from "readline";
import * as database from "./database";

//TODO: refactor to function
var airportsReader = rd.createInterface(
  fs.createReadStream("./src/resources/airports.dat.txt")
);
var routesReader = rd.createInterface(
  fs.createReadStream("./src/resources/routes.dat.txt")
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
        database.routesDb.put(startAirportId, {
          StartAirportId: startAirportId,
          DestinationAirportId: destinationAirportId,
        });
      });
      resolve();
    });
  }


  
// export async function readMyFile(filePath:any) {
//   fs.readFile(filePath,"utf8", (error,data)=>{
//     if(error){
//       console.log(error)
//       return
//     }
//     // console.log(data);

//     var id;
//     var arr:string[]=[];
//     for(var i of data){
//       var tokens = data.split(",");

//       for(var co = 0; co<1;co++){
//       id = tokens[3];
//       }
//       arr.push( tokens[5]);
//     }
//     console.log(id);
//     return ;
//   })
// }


  // export function asyncWriteRoutesDataFromFileNew(): Promise<RouteDb> {
  //   var id: string;
  //   var li:Array<string>=[];
  //   return new Promise((resolve, rejects) => {
  //     routesReader.on("line", (l: string) => {
  //       var tokens = l.split(",");
  //       var startAirportId = tokens[3];
  //       var destinationAirportId = tokens[5];
  //       id = tokens[3];
  //       li.push(tokens[5]);
  //     });
  //     resolve( database.routesDb.put("1",{StartAirportId: id, DestinationAirportId: li}));
  //   });
  // }






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
