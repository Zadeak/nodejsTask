import { Depot } from "depot-db";
import { routeConverter } from "./DataConverter";
export const airportsDAO = new Depot<Airport>("Airports");
export const routesDAO = new Depot<RouteDb>("Routes");
export const routeObjectDao = new Depot<Route>("RouteObjecs");

export async function getRoute(airportId: string) {
  var routeDbEntryArray: any;

  try {
    routeDbEntryArray = await routeObjectDao.get(airportId);
    console.log("found in routeObject table");
    return routeDbEntryArray;
  } catch (e) {
    console.log(airportId + " not found in routeObject Table");
  }

  try {
    routeDbEntryArray = await routesDAO.find({
      where: (route) => route.StartAirportId === airportId,
    });
  } catch (e) {
    console.log(e);
    console.log("Key: " + airportId);
  }
  return routeConverter(routeDbEntryArray);
}

export async function getAirportDataByCode(airportId: string) {
  var airportData;
  airportData = await airportsDAO.find({
    where: (airport) => airport.IATA === airportId,
  });

  if (airportData.length === 0) {
    airportData = await airportsDAO.find({
      where: (airport) => airport.ICAO === airportId,
    });
  }

  return airportData;
}
export async function getAirportDataById(airportId: number) {
  const airportData = await airportsDAO.get(airportId.toString());
  return airportData;

  // const airportData = await airportsDb.find({
  //   where: (airport) => airport.Id === airportId,
  // });
}

export async function writeRoutes(
  startAirportId: string,
  destinationAirportId: string
) {
  await routesDAO.put(startAirportId.toString(), {
    StartAirportId: startAirportId.toString(),
    DestinationAirportId: destinationAirportId,
  });
}

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
