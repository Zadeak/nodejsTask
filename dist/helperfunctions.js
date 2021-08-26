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
exports.resolvePath = exports.delay = exports.getCoorinates = exports.calculateDistance = exports.readPath = void 0;
const database = __importStar(require("./database/databasePersistence"));
const geodist = require("geodist");
const logger_1 = require("./logger");
function readPath(stringArray) {
    return __awaiter(this, void 0, void 0, function* () {
        var LenghtCounter = 0;
        var airportsCodes = [];
        for (var airportcode of stringArray) {
            var airportData = yield database.getAirportDataById(Number.parseInt(airportcode));
            airportsCodes.push("Name: " + airportData.Name + " IATA:" + airportData.IATA + " ICAO:" + airportData.ICAO);
        }
        // TODO: maybe it is better to save a->b in km in database as table?
        for (var indexof = 0; indexof < stringArray.length - 1; indexof++) {
            const from = stringArray[indexof];
            const to = stringArray[indexof + 1];
            var coordinates = yield getCoorinates(from, to);
            const distance = calculateDistance({ coordinates });
            LenghtCounter = +distance;
        }
        var totalDistanceString = LenghtCounter.toFixed(2);
        var totalDistance = Number.parseFloat(totalDistanceString);
        return { airportsCodes, totalDistance };
    });
}
exports.readPath = readPath;
function calculateDistance({ coordinates }) {
    return geodist({ lat: coordinates.firstlat, lon: coordinates.firstlon }, { lat: coordinates.secondlat, lon: coordinates.secondlon }, { exact: true, unit: "km" });
}
exports.calculateDistance = calculateDistance;
function getCoorinates(startingPoint, destinationPoint) {
    return __awaiter(this, void 0, void 0, function* () {
        var startAirport = yield database.getAirportDataById(Number.parseInt(startingPoint));
        var destAirport = yield database.getAirportDataById(Number.parseInt(destinationPoint));
        var firstlat = startAirport.Latitude;
        var firstlon = startAirport.Longitude;
        var secondlat = destAirport.Latitude;
        var secondlon = destAirport.Longitude;
        return { firstlat, firstlon, secondlat, secondlon };
    });
}
exports.getCoorinates = getCoorinates;
// export async function addEdges(graph: Graph, point: Route) {
//   for (var it of point.DestinationAirportId) {
//     graph.addNode(it);
//     var coordinates = await getCoorinates(point.StartAirportId, it);
//     graph.addEdge(point.StartAirportId, it, {
//       weight: calculateDistance({ coordinates }),
//     });
//   }
// }
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.delay = delay;
function resolvePath({ message, codes }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (message.includes("no path")) {
            logger_1.logger.debug(`${message}: this path is not possible with 3 stops`);
            const from = yield database.getAirportDataById(codes[0]);
            const to = yield database.getAirportDataById(codes[1]);
            return { airportsCodes: [`Flight from: ${from.Name}, IATA: '${from.IATA}', ICAO: '${from.ICAO}' to: ${to.Name}, IATA: '${to.IATA}' ICAO: '${to.ICAO}' is not possible with 5 stops`], totalDistance: 0 };
        }
        else {
            var distanceData = yield readPath(message);
            distanceData.airportsCodes.forEach((data) => {
                logger_1.logger.debug(data + "=>");
            });
            logger_1.logger.debug("Distance:" + distanceData.totalDistance + ":" + " KM");
            var airportsCodes = distanceData.airportsCodes;
            var totalDistance = distanceData.totalDistance;
            return { airportsCodes, totalDistance };
        }
    });
}
exports.resolvePath = resolvePath;
//# sourceMappingURL=helperfunctions.js.map