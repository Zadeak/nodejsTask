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
const PopulateDb_1 = require("./PopulateDb");
const database = __importStar(require("./database"));
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const packages = require('../package.json');
// writeAirportsDataFromFile().then(()=>{
//     database.airportsDb.forEach((data) => console.log(data));
// });
// const wat = writeAirport.then(()=>{
//     database.airportsDb.forEach((data)=> {console.log(data)});
// })
(() => __awaiter(void 0, void 0, void 0, function* () {
    const val1 = yield PopulateDb_1.asyncWriteRoutesDataFromFile();
    const val2 = yield PopulateDb_1.asyncWriteAirportsDataFromFile();
    const val3 = yield database.routesDb.find({
        where: route => route.StartAirportId === "3370"
    });
    console.log(val3);
}))();
// showData(6);
const port = process.env.port || 3000;
const app = express();
const apiRoot = '/api';
//configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/localhost/ }));
app.options('*', cors());
// config routes
const router = express.Router();
router.get('/', (req, res) => {
    res.send(`${packages.description} - ${packages.version}`);
});
//register all our routes
app.use(apiRoot, router);
app.listen(port, () => {
    console.log("server is up!");
});
//# sourceMappingURL=index.js.map