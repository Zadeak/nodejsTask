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
exports.getRoute = exports.routesDb = exports.airportsDb = void 0;
const depot_db_1 = require("depot-db");
const DataConverter_1 = require("./DataConverter");
exports.airportsDb = new depot_db_1.Depot("Airports");
exports.routesDb = new depot_db_1.Depot("Routes");
function getRoute(airportId) {
    return __awaiter(this, void 0, void 0, function* () {
        const routeDbEntryArray = yield exports.routesDb.find({
            where: (route) => route.StartAirportId === airportId,
        });
        return yield DataConverter_1.routeConverter(routeDbEntryArray);
    });
}
exports.getRoute = getRoute;
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