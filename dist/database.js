"use strict";
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
exports.writeRoutes = exports.getAirportDataById = exports.getAirportDataByCode = exports.getRoute = exports.getAirportIdByCode = exports.airportIdDao = exports.routesDao = exports.routesDirty = exports.airportsDAO = void 0;
const depot_db_1 = require("depot-db");
const DataConverter_1 = require("./DataConverter");
exports.airportsDAO = new depot_db_1.Depot("Airports");
exports.routesDirty = new depot_db_1.Depot("Routes");
exports.routesDao = new depot_db_1.Depot("RouteObjecs");
exports.airportIdDao = new depot_db_1.Depot("airportId");
function getAirportIdByCode(airportCode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const airportData = yield exports.airportIdDao.find({ where: airport => airport.IATA === airportCode });
            console.log(`found airport by code IATA: ${airportCode} in AirportId table`);
            return airportData[0].Id;
        }
        catch (error) {
            console.log(`airport code IATA ${airportCode} is not found in airportIdDao`);
        }
        try {
            const airportData = yield exports.airportIdDao.find({ where: airport => airport.ICAO === airportCode });
            console.log(`found airport by code ICAO: ${airportCode} in AirportId table`);
            return airportData[0].Id;
        }
        catch (error) {
            console.log(`airport code ICAO ${airportCode} is not found in airportIdDao`);
        }
        const airportDataArray = yield getAirportDataByCode(airportCode);
        const airportData = airportDataArray[0];
        const airportId = airportData.Id;
        const airportIATA = airportData.IATA;
        const airportICAO = airportData.ICAO;
        yield exports.airportIdDao.put(airportId.toString(), { Id: airportId, IATA: airportIATA, ICAO: airportICAO });
        console.log(`Saved airport by code ${airportCode} to airportID table`);
        return airportId;
    });
}
exports.getAirportIdByCode = getAirportIdByCode;
function getRoute(airportId) {
    return __awaiter(this, void 0, void 0, function* () {
        var routeDbEntryArray;
        try {
            routeDbEntryArray = yield exports.routesDao.get(airportId);
            console.log("found in routeObject table");
            return routeDbEntryArray;
        }
        catch (e) {
            console.log(airportId + " not found in routeObject Table");
        }
        try {
            routeDbEntryArray = yield exports.routesDirty.find({
                where: (route) => route.StartAirportId == airportId,
            });
        }
        catch (e) {
            console.log(e);
            console.log("Key: " + airportId);
        }
        return DataConverter_1.routeConverter(routeDbEntryArray);
    });
}
exports.getRoute = getRoute;
function getAirportDataByCode(airportId) {
    return __awaiter(this, void 0, void 0, function* () {
        var airportData;
        airportData = yield exports.airportsDAO.find({
            where: (airport) => airport.IATA === airportId,
        });
        if (airportData.length === 0) {
            airportData = yield exports.airportsDAO.find({
                where: (airport) => airport.ICAO === airportId,
            });
        }
        return airportData;
    });
}
exports.getAirportDataByCode = getAirportDataByCode;
function getAirportDataById(airportId) {
    return __awaiter(this, void 0, void 0, function* () {
        const airportData = yield exports.airportsDAO.get(airportId.toString());
        return airportData;
    });
}
exports.getAirportDataById = getAirportDataById;
function writeRoutes(startAirportId, destinationAirportId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.routesDirty.put(startAirportId.toString(), {
            StartAirportId: startAirportId.toString(),
            DestinationAirportId: destinationAirportId,
        });
    });
}
exports.writeRoutes = writeRoutes;
//# sourceMappingURL=database.js.map