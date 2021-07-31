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
exports.delay = exports.addEdges = exports.getCoorinates = exports.calculateDistance = exports.readPath = void 0;
const database = __importStar(require("./database"));
const geodist = require("geodist");
function readPath(stringArray) {
    return __awaiter(this, void 0, void 0, function* () {
        var LenghtCounter;
        // TODO: maybe it is better to save a->b in km in database as table?
        for (var indexof = 0; indexof < stringArray.length - 1; indexof++) {
            const from = stringArray[indexof];
            const to = stringArray[indexof + 1];
            console.log("From: " + from + "To: " + to);
            var { startAirportLat, startAirportLon, destAirportLat, destAirportLon } = yield getCoorinates(from, to);
            const distance = calculateDistance(startAirportLat, startAirportLon, destAirportLat, destAirportLon);
            LenghtCounter = +distance;
        }
        return LenghtCounter;
    });
}
exports.readPath = readPath;
function calculateDistance(firstLat, firstLon, secondlat, secondLon) {
    return geodist({ lat: firstLat, lon: firstLon }, { lat: secondlat, lon: secondLon }, { exact: true, unit: "km" });
}
exports.calculateDistance = calculateDistance;
function getCoorinates(startingPoint, destinationPoint) {
    return __awaiter(this, void 0, void 0, function* () {
        var startAirport = yield database.getAirportDataById(Number.parseInt(startingPoint));
        var destAirport = yield database.getAirportDataById(Number.parseInt(destinationPoint));
        var startAirportLat = startAirport.Latitude;
        var startAirportLon = startAirport.Longitude;
        var destAirportLat = destAirport.Latitude;
        var destAirportLon = destAirport.Longitude;
        return { startAirportLat, startAirportLon, destAirportLat, destAirportLon };
    });
}
exports.getCoorinates = getCoorinates;
function addEdges(graph, point) {
    return __awaiter(this, void 0, void 0, function* () {
        for (var it of point.DestinationAirportId) {
            graph.addNode(it);
            var { startAirportLat, startAirportLon, destAirportLat, destAirportLon } = yield getCoorinates(point.StartAirportId, it);
            graph.addEdge(point.StartAirportId, it, {
                weight: calculateDistance(startAirportLat, startAirportLon, destAirportLat, destAirportLon),
            });
        }
    });
}
exports.addEdges = addEdges;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.delay = delay;
//# sourceMappingURL=helperfunctions.js.map