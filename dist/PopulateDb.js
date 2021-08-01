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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWriteRoutesDataFromFile = exports.populateRoutesDb = exports.asyncWriteAirportsDataFromFile = exports.counter = void 0;
const fs = __importStar(require("fs"));
const rd = __importStar(require("readline"));
const database = __importStar(require("./database/database"));
const database_1 = require("./database/database");
exports.counter = 0;
// TODO: refactor to function
// var airportsReader = rd.createInterface(
//   fs.createReadStream("../src/resources/airports.dat.txt")
// );
// var routesReader = rd.createInterface(
//   fs.createReadStream("../src/resources/routes.dat.txt")
// );
function createStreamReader(path) {
    return rd.createInterface(fs.createReadStream(path));
}
function asyncWriteAirportsDataFromFile() {
    return new Promise((resolve) => {
        createStreamReader("./src/resources/airports.dat.txt").on("line", (l) => {
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
        });
        resolve();
    });
}
exports.asyncWriteAirportsDataFromFile = asyncWriteAirportsDataFromFile;
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
// export async function asyncWriteRoutesDataFromFile(): Promise<void> {
//   createStreamReader("./src/resources/routes.dat.txt").on(
//     "line",
//     (l: string) => {
//       var tokens = l.split(",");
//       var startAirportId = tokens[3];
//       var destinationAirportId = tokens[5];
//       database.writeRoutes(startAirportId, destinationAirportId);
//     }
//   );
//   // rejects(console.log("what"));
// }
// -------------------------------------------------
function readFile(filePath) {
    return fs.readFileSync(filePath, "utf-8");
}
function populateRoutesDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const newLocal = readFile("./src/resources/routes.dat.txt");
        const lineArray = newLocal.split("\n");
        for (var line of lineArray) {
            var tokens = line.split(",");
            var startAirportId = tokens[3];
            var destinationAirportId = tokens[5];
            if (startAirportId === undefined) {
                continue;
            }
            yield database.routesDirty.put(line, {
                StartAirportId: startAirportId,
                DestinationAirportId: destinationAirportId,
            }).then();
            exports.counter++;
            console.log(exports.counter);
        }
    });
}
exports.populateRoutesDb = populateRoutesDb;
function asyncWriteRoutesDataFromFile() {
    return new Promise((resolve, rejects) => {
        createStreamReader("./src/resources/routes.dat.txt").on("line", (l) => __awaiter(this, void 0, void 0, function* () {
            var tokens = l.split(",");
            var startAirportId = tokens[3];
            var destinationAirportId = tokens[5];
            yield database_1.routesDirty.put(startAirportId + ":" + destinationAirportId, {
                StartAirportId: startAirportId.toString(),
                DestinationAirportId: destinationAirportId,
            });
            exports.counter++;
        }));
        resolve(() => { });
        // rejects(console.log("what"));
    });
}
exports.asyncWriteRoutesDataFromFile = asyncWriteRoutesDataFromFile;
//# sourceMappingURL=PopulateDb.js.map