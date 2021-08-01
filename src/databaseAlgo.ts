import * as database from "./database/databasePersistence";
import {loadData} from "./service/data/dataLoaderService";
import {resolvePath} from "./helperfunctions";
import { findPath } from "./service/api/graphAlgorithm";
(async () => {
  console.log(new Date());
  await loadData();
  var route = await database.getRoute("2965");
  console.log(route);

  const start = await database.getAirportIdByCode("ASF");
  const stop = await database.getAirportIdByCode("EGLL");


  var path = await findPath(4, start.toString(),stop.toString())
  await resolvePath(path);
  console.log(new Date());
})();

