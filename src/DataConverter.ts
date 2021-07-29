import { Router } from "express";
import * as database from "./database";
import {
  asyncWriteAirportsDataFromFile,
  asyncWriteRoutesDataFromFile,
} from "./PopulateDb";

//TODO: save filtered and converted routes in db
export function routeConverter(routeDbArray: RouteDb[]): Route {
  var arr: Array<string> = [];
  for (var i of routeDbArray) {
    arr.push(i.DestinationAirportId);
  }
  var ar = arr
    .filter((v, i, a) => a.indexOf(v) == i)
    .filter((value, index, array) => value !== "\\N");
  return {
    StartAirportId: routeDbArray[0].StartAirportId,
    DestinationAirportId: ar,
  };
}
