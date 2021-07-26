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
(() => __awaiter(void 0, void 0, void 0, function* () {
    const val1 = yield PopulateDb_1.asyncWriteRoutesDataFromFile();
    const val2 = yield PopulateDb_1.asyncWriteAirportsDataFromFile();
    const val3 = yield database.routesDb.find({
        where: (route) => route.StartAirportId === "3370",
    });
    console.log(val3);
}))();
console.log("hell yeah!");
var firstOne = { num: "1", linkedArray: ["1", "1"] };
function test(depth) {
    //temp value
    var number = "2";
    var depthCounter = 0;
    var tempListSize = 0;
    // console.log(depth);
    var nodeList = [firstOne];
    var tempList = [];
    while (depthCounter != depth) {
        // console.log("depth: " + depth);
        for (var entry in nodeList.slice(-tempListSize)) {
            //   var nodeEdge = nodeList[edge];
            //   nodeEdge.label = "first";
            // получить список всех путей из кода
            var extractedRoutes = nodeList[entry].linkedArray;
            // console.log("extractedRoute: " + nodeList[edge].linkedArray);
            for (var route in extractedRoutes) {
                // console.log("route: " + route);
                // какая-то работа с путями
                // делаем edge | из edge -> route + weight
                var newOne = {
                    num: number,
                    linkedArray: [number, number],
                };
                tempList.push(newOne);
                var n = Number.parseInt(number);
                n++;
                number = n.toString();
                // console.log("created object newOne: " + newOne.num);
                // console.log(
                //   "tempList affter addition: " +
                //     tempList.forEach((data) => console.log(data))
                // );
            }
        }
        var tempListSize = tempList.length;
        console.log("size: " + tempListSize);
        nodeList.push.apply(nodeList, tempList);
        tempList = [];
        depthCounter++;
    }
    // console.log("final list:");
    nodeList.forEach((data) => console.log(data));
}
exports.test = test;
test(3);
//# sourceMappingURL=databaseAlgo.js.map