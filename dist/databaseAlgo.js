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
const database = __importStar(require("./database/databasePersistence"));
const dataLoaderService_1 = require("./service/data/dataLoaderService");
const helperfunctions_1 = require("./helperfunctions");
const graphAlgorithm_1 = require("./service/api/graphAlgorithm");
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(new Date());
    yield dataLoaderService_1.loadData();
    var route = yield database.getRoute("2965");
    console.log(route);
    const start = yield database.getAirportIdByCode("ASF");
    const stop = yield database.getAirportIdByCode("EGLL");
    var path = yield graphAlgorithm_1.findPath(4, start.toString(), stop.toString());
    yield helperfunctions_1.resolvePath(path);
    console.log(new Date());
}))();
//# sourceMappingURL=databaseAlgo.js.map