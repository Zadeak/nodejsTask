import * as database from "./database/database";

//TODO: save filtered and converted routes in db
export function routeConverter(routeDbArray: RouteDb[]): Route {
  var arr: Array<string> = [];
  for (var i of routeDbArray) {
    arr.push(i.DestinationAirportId);
  }
  var ar = arr
    .filter((v, i, a) => a.indexOf(v) == i)
    .filter((value, index, array) => value !== "\\N");

  database.routesDao.put(routeDbArray[0].StartAirportId.toString(), {
    StartAirportId: routeDbArray[0].StartAirportId.toString(),
    DestinationAirportId: ar,
  });
  return {
    StartAirportId: routeDbArray[0].StartAirportId,
    DestinationAirportId: ar,
  };
}
