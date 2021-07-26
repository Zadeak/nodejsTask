"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWriteRoutesDataFromFile = exports.asyncWriteAirportsDataFromFile = void 0;
const fs = __importStar(require("fs"));
const rd = __importStar(require("readline"));
const database = __importStar(require("./database"));
//TODO: refactor to function
var airportsReader = rd.createInterface(fs.createReadStream("./src/resources/airports.dat.txt"));
var routesReader = rd.createInterface(fs.createReadStream("./src/resources/routes.dat.txt"));
function asyncWriteAirportsDataFromFile() {
    return new Promise((resolve, rejects) => {
        airportsReader.on("line", (l) => {
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
exports.asyncWriteAirportsDataFromFile = asyncWriteAirportsDataFromFile;
function asyncWriteRoutesDataFromFile() {
    return new Promise((resolve, rejects) => {
        routesReader.on("line", (l) => {
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
exports.asyncWriteRoutesDataFromFile = asyncWriteRoutesDataFromFile;
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
//# sourceMappingURL=PopulateDb.js.map