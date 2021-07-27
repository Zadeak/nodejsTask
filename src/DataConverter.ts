import { Router } from "express";
import * as database from "./database";
import {
  asyncWriteAirportsDataFromFile,
  asyncWriteRoutesDataFromFile,
} from "./PopulateDb";

export function routeConverter(routeDbArray: RouteDb[]): Route {
  var arr: Array<string> = [];
  for (var i of routeDbArray) {
    arr.push(i.DestinationAirportId.toString());
  }
  var ar = arr.filter((v, i, a) => a.indexOf(v) == i);
  var lol: Route = {
    StartAirportId: routeDbArray[0].StartAirportId,
    DestinationAirportId: ar,
  };
  return lol;
}
