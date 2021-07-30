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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const database = __importStar(require("./database"));
const PopulateDb_1 = require("./PopulateDb");
const geodist = require("geodist");
const graphology_shortest_path_1 = require("graphology-shortest-path");
const graphology_1 = __importDefault(require("graphology")); // may be problems?
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(new Date());
    yield PopulateDb_1.populateRoutesDb();
    yield PopulateDb_1.asyncWriteAirportsDataFromFile();
    var route = yield database.getRoute("6334");
    console.log(route);
    //503, 2912,9823 - not found
    var path = yield test(5, route, "2912");
    var distance = yield readPath(path.split(","));
    console.log(distance);
    console.log(new Date());
}))();
function test(depth, startingPoint, endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        const graph = new graphology_1.default();
        var depthCounter = 0;
        var tempListSize = 0;
        var nodeList = [startingPoint];
        var tempList = [];
        graph.addNode(startingPoint.StartAirportId);
        while (depthCounter != depth) {
            for (var entry of nodeList.slice(-tempListSize)) {
                var extractedRoutes = entry.DestinationAirportId;
                for (var route of extractedRoutes) {
                    //move to function
                    try {
                        graph.addNode(route);
                    }
                    catch (error) {
                        continue;
                    }
                    if (route === "9823") {
                        console.log("Checking for 9823");
                    }
                    try {
                        if (route === undefined) {
                            console.log("here!");
                        }
                        var newRoute = yield database.getRoute(route);
                    }
                    catch (error) {
                        console.log(error);
                        console.log(route);
                        return "";
                    }
                    var { startAirportLat, startAirportLon, destAirportLat, destAirportLon, } = yield getCoorinates(entry.StartAirportId, route);
                    //move to fun?
                    graph.addEdge(entry.StartAirportId, route, {
                        weight: calculateDistance(startAirportLat, startAirportLon, destAirportLat, destAirportLon),
                    });
                    // if (route === endpoint) {
                    //   console.log("added point == endpoint");
                    //   try {
                    //     const path = dijkstra.bidirectional(
                    //       graph,
                    //       startingPoint.StartAirportId,
                    //       endpoint,
                    //       "weight"
                    //     );
                    //     console.log(path.toString());
                    //     return path.toString();
                    //   } catch (error) {
                    //     // console.log(error);
                    //     continue;
                    //   }
                    // }
                    //move to function
                    tempList.push(newRoute);
                    try {
                        const path = graphology_shortest_path_1.dijkstra.bidirectional(graph, startingPoint.StartAirportId, endpoint, "weight");
                        console.log(path.toString());
                        return path.toString();
                    }
                    catch (error) {
                        // console.log(error);
                        continue;
                    }
                }
            }
            var tempListSize = tempList.length;
            nodeList.push.apply(nodeList, tempList);
            tempList = [];
            depthCounter++;
        }
        //check if path exist
        return graphology_shortest_path_1.dijkstra
            .bidirectional(graph, startingPoint.StartAirportId, endpoint, "weight")
            .toString();
    });
}
exports.test = test;
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
function calculateDistance(firstLat, firstLon, secondlat, secondLon) {
    return geodist({ lat: firstLat, lon: firstLon }, { lat: secondlat, lon: secondLon }, { exact: true, unit: "km" });
}
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
//# sourceMappingURL=databaseAlgo.js.map