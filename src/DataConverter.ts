import { Router } from "express";
import * as database from "./database";
import {
  asyncWriteAirportsDataFromFile,
  asyncWriteRoutesDataFromFile,
} from "./PopulateDb";

export function convertToRoute(val3: RouteDb[]):Route {
  var arr: Array<string> = [];
  for (var i of val3) {
    arr.push(i.DestinationAirportId.toString());
  }
  var lol: Route = {
    StartAirportId: val3[0].StartAirportId,
    DestinationAirportId: arr,
  };
  return lol;
}
