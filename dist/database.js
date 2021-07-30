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
exports.writeRoutes = exports.getAirportDataById = exports.getAirportDataByCode = exports.getRoute = exports.routeObjectDao = exports.routesDAO = exports.airportsDAO = void 0;
const depot_db_1 = require("depot-db");
const DataConverter_1 = require("./DataConverter");
exports.airportsDAO = new depot_db_1.Depot("Airports");
exports.routesDAO = new depot_db_1.Depot("Routes");
exports.routeObjectDao = new depot_db_1.Depot("RouteObjecs");
function getRoute(airportId) {
    return __awaiter(this, void 0, void 0, function* () {
        var routeDbEntryArray;
        try {
            routeDbEntryArray = yield exports.routeObjectDao.get(airportId);
            console.log("found in routeObject table");
            return routeDbEntryArray;
        }
        catch (e) {
            console.log(airportId + " not found in routeObject Table");
        }
        try {
            routeDbEntryArray = yield exports.routesDAO.find({
                where: (route) => route.StartAirportId === airportId,
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
        // const airportData = await airportsDb.find({
        //   where: (airport) => airport.Id === airportId,
        // });
    });
}
exports.getAirportDataById = getAirportDataById;
function writeRoutes(startAirportId, destinationAirportId) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.routesDAO.put(startAirportId.toString(), {
            StartAirportId: startAirportId.toString(),
            DestinationAirportId: destinationAirportId,
        });
    });
}
exports.writeRoutes = writeRoutes;
// // Define a document type
// type Person = { firstname: string, lastname: string, age: number };
// // Initialize a people database (Stored in /databases/people)
// const people = new Depot<Person>("people");
// // Store some people
// people.put("John", { firstname: "John", lastname: "Doe", age: 32 });
// people.put("Jane", { firstname: "Jane", lastname: "Doe", age: 32 });
// people.put("Tim", { firstname: "Tim", lastname: "Burton", age: 59 });
// people.put("Tony", { firstname: "Stark", lastname: "Doe", age: 45 });
// Query people
// var person = people.find({
//     where: person => person.firstname == "John"
// }).then(personsOlderThat32 => {
//     // personsOlderThat32 = [
//     //     { firstname: "Tim", lastname: "Burton", age: 61 },
//     //     { firstname: "Stark", lastname: "Doe", age: 53 }
//     // ];
// });
// // Find a person by their key (rejects if person is not found)
// people.get("John").then( data => console.log("here"+data.firstname)/** { firstname: "John", lastname: "Doe", age: 32 } */);
//# sourceMappingURL=database.js.map