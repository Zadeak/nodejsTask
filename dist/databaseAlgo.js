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
const database = __importStar(require("./database/databasePersistence"));
const dataLoaderService_1 = require("./service/data/dataLoaderService");
const graphology_shortest_path_1 = require("graphology-shortest-path");
const graphology_1 = __importDefault(require("graphology")); // may be problems?
const helperfunctions_1 = require("./helperfunctions");
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(new Date());
    yield dataLoaderService_1.loadData();
    var route = yield database.getRoute("2965");
    console.log(route);
    const start = yield database.getAirportIdByCode("ASF");
    const stop = yield database.getAirportIdByCode("SAW");
    var path = yield test(4, start.toString(), stop.toString());
    // if (path.includes("path from")) {
    //   console.log("path is not possible with 3 stops");
    // } else {
    //   var distance = await readPath(path.split(","));
    //   console.log(distance + " KM");
    // }
    yield helperfunctions_1.resolvePath(path);
    console.log(new Date());
}))();
function test(depth, startingPoint, endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        const graph = new graphology_1.default();
        var depthCounter = 0;
        var tempListSize = 0;
        const startPoint = yield database.getRoute(startingPoint);
        var nodeList = [startPoint];
        var tempList = [];
        graph.addNode(startPoint.StartAirportId);
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
                    var newRoute;
                    try {
                        newRoute = yield database.getRoute(route);
                    }
                    catch (error) {
                        console.log("route:" + route + "does not have any other routes to go to");
                        continue;
                    }
                    var coordinates;
                    try {
                        coordinates = yield helperfunctions_1.getCoorinates(entry.StartAirportId, route);
                        graph.addEdge(entry.StartAirportId, route, {
                            weight: helperfunctions_1.calculateDistance({ coordinates }),
                        });
                        tempList.push(newRoute);
                        try {
                            const path = graphology_shortest_path_1.dijkstra.bidirectional(graph, startPoint.StartAirportId, endpoint, "weight");
                            console.log(path.toString());
                            return path.toString();
                        }
                        catch (error) {
                            continue;
                        }
                    }
                    catch (error) {
                        console.log("airport is absent in airport.dat by airportId in routes.dat file");
                        coordinates = { firstlat: 1, firstlon: 1, secondlat: 1, secondlon: 1 };
                    }
                    if (coordinates.firstlat === 1 && coordinates.firstlon === 1 && coordinates.secondlat === 1) {
                        continue;
                    }
                }
            }
            var tempListSize = tempList.length;
            nodeList.push.apply(nodeList, tempList);
            tempList = [];
            depthCounter++;
            console.log("DEPTHCOUNTER" + depthCounter);
        }
        //check if path exist
        return `path from ${startingPoint} to ${endpoint} is not found`;
    });
}
exports.test = test;
//# sourceMappingURL=databaseAlgo.js.map