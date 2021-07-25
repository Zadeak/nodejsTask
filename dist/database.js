"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesDb = exports.airportsDb = void 0;
const depot_db_1 = require("depot-db");
exports.airportsDb = new depot_db_1.Depot("Airports");
exports.routesDb = new depot_db_1.Depot("Routes");
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