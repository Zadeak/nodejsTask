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
exports.test = void 0;
const database = __importStar(require("./database"));
const PopulateDb_1 = require("./PopulateDb");
var jsgraphs = require("js-graph-algorithms");
const geodist = require("geodist");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield PopulateDb_1.asyncWriteRoutesDataFromFile();
    yield PopulateDb_1.asyncWriteAirportsDataFromFile();
    const testnum = yield database.routesDAO.count();
    var route = yield database.getRoute("2966");
    console.log(route);
    test(1, route);
}))();
function test(depth, startingPoint) {
    return __awaiter(this, void 0, void 0, function* () {
        var edges = [];
        for (var it of startingPoint.DestinationAirportId) {
            var { startAirportLat, startAirportLon, destAirportLat, destAirportLon } = yield getCoorinates(startingPoint.StartAirportId, it);
            const newLocal = new jsgraphs.Edge(startingPoint.StartAirportId, it, calculateDistance(startAirportLat, startAirportLon, destAirportLat, destAirportLon));
            edges.push(newLocal);
        }
        console.log(edges);
        //
        //temp value
        var depthCounter = 0;
        var tempListSize = 0;
        // console.log(depth);
        var nodeList = [startingPoint];
        var tempList = [];
        while (depthCounter != depth) {
            // console.log("depth: " + depth);
            for (var entry in nodeList.slice(-tempListSize)) {
                //   var nodeEdge = nodeList[edge];
                //   nodeEdge.label = "first";
                // получить список всех путей из кода
                var extractedRoutes = nodeList[entry].DestinationAirportId;
                // console.log("extractedRoute: " + nodeList[edge].linkedArray);
                for (var route in extractedRoutes) {
                    var newRoute = yield database.getRoute(extractedRoutes[route]);
                    // console.log("Array: newRoute"); ВАЖНО
                    // console.dir(newRoute, { maxArrayLength: null }); ВАЖНО
                    // newRoute.DestinationAirportId.pop();
                    // for (var i of newRoute.DestinationAirportId) {
                    //   const newLocal = new jsgraphs.Edge(newRoute.StartAirportId, i, 5.0);
                    //   edges.push(newLocal);
                    // }
                    for (var it of newRoute.DestinationAirportId) {
                        var { startAirportLat, startAirportLon, destAirportLat, destAirportLon, } = yield getCoorinates(newRoute.StartAirportId, it);
                        const newLocal = new jsgraphs.Edge(newRoute.StartAirportId, it, calculateDistance(startAirportLat, startAirportLon, destAirportLat, destAirportLon));
                        edges.push(newLocal);
                    }
                    // console.log(extractedRoutes[route]);
                    // console.log("route: " + route);
                    // какая-то работа с путями
                    // делаем edge | из edge -> route + weight
                    tempList.push(newRoute);
                    // console.log("created object newOne: " + newOne.num);
                    // console.log(
                    //   "tempList affter addition: " +
                    //     tempList.forEach((data) => console.log(data))
                    // );
                }
            }
            var tempListSize = tempList.length;
            // console.log("size: " + tempListSize);
            nodeList.push.apply(nodeList, tempList);
            // nodeList.push(tempList);
            // nodeList = nodeList.concat(tempList);
            tempList = [];
            depthCounter++;
        }
        // console.log(edges);
        // var text = "";
        // for (var d of edges) {
        //   var lol = JSON.stringify(d);
        //   text.concat(lol + "\n");
        // }
        // console.log(text);
        // fs.writeFileSync("outputfile.txt", text);
        // let writeStream = fs.createWriteStream("outputfile.txt");
        // for (var d of edges) {
        //   var lol = JSON.stringify(d);
        //   writeStream.write(lol + "\n", "utf-8");
        // }
        // writeStream.on("finish", () => {
        //   console.log("wrote all data to file");
        // });
        // writeStream.end();
        // console.dir(nodeList, { maxArrayLength: null });
        // console.log("Node list");
        //   console.dir(nodeList, { maxArrayLength: null });
        //   // nodeList.forEach((data)=>console.log(data));
        // function returnDataName(element:Route,index:any,array:any){
        //  return(element.StartAirportId)
        // }
        //   const filteredList = nodeList.filter(returnDataName);
        //   console.log(filteredList);
        //   for(var i of filteredList){
        //     console.log(i.StartAirportId);
        //   }
        console.log(edges);
        //
        // var str = JSON.stringify(nodeList);
        // console.log(str);
        // console.log("final list:");
        // nodeList.forEach((data) => console.log(data));
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
//# sourceMappingURL=databaseAlgo.js.map