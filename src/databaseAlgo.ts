import { Edge } from "js-graph-algorithms";
import * as database from "./database";
import {
  asyncWriteAirportsDataFromFile,
  asyncWriteRoutesDataFromFile,
} from "./PopulateDb";
var jsgraphs = require("js-graph-algorithms");
import * as fs from "fs";

(async () => {
  await asyncWriteRoutesDataFromFile();
  await asyncWriteAirportsDataFromFile();

  var route = await database.getRoute("2966");
  console.log(route);
  test(1, route);
})();

export async function test(depth: number, startingPoint: Route) {
  var edges = [];
  for (var i of startingPoint.DestinationAirportId) {
    const newLocal = new jsgraphs.Edge(startingPoint.StartAirportId, i, 5.0);
    edges.push(newLocal);
  }
  // console.log(edges);

  //
  //temp value
  var depthCounter = 0;
  var tempListSize = 0;

  // console.log(depth);

  var nodeList: Array<Route> = [startingPoint];
  var tempList: Array<Route> = [];

  while (depthCounter != depth) {
    // console.log("depth: " + depth);

    for (var entry in nodeList.slice(-tempListSize)) {
      //   var nodeEdge = nodeList[edge];
      //   nodeEdge.label = "first";
      // получить список всех путей из кода

      var extractedRoutes = nodeList[entry].DestinationAirportId;
      // console.log("extractedRoute: " + nodeList[edge].linkedArray);
      for (var route in extractedRoutes) {
        var newRoute: Route = await database.getRoute(extractedRoutes[route]);

        // console.log("Array: newRoute"); ВАЖНО
        // console.dir(newRoute, { maxArrayLength: null }); ВАЖНО

        // newRoute.DestinationAirportId.pop();

        for (var i of newRoute.DestinationAirportId) {
          const newLocal = new jsgraphs.Edge(newRoute.StartAirportId, i, 5.0);
          edges.push(newLocal);
        }

        // console.log(extractedRoutes[route]);
        // console.log("route: " + route);
        // какая-то работа с путями
        // делаем edge | из edge -> route + weight

        tempList.push(newRoute);

        // console.log("created object newOne: " + newOne.num);
        // console.log(
        //   "tempList affter addition: " +
        //     tempList.forEach((data) => console.log(data))
        // );
      }
    }

    var tempListSize = tempList.length;

    // console.log("size: " + tempListSize);

    // nodeList.push.apply(nodeList, tempList);
    // nodeList.push(tempList);
    nodeList = nodeList.concat(tempList);

    tempList = [];
    depthCounter++;
  }
  // console.log(edges);

  var text = "";

  for (var d of edges) {
    var lol = JSON.stringify(d);
    text.concat(lol + "\n");
  }
  console.log(text);
  fs.writeFileSync("outputfile.txt", text);

  let writeStream = fs.createWriteStream("outputfile.txt");
  for (var d of edges) {
    var lol = JSON.stringify(d);
    writeStream.write(lol + "\n", "utf-8");
  }
  writeStream.on("finish", () => {
    console.log("wrote all data to file");
  });
  writeStream.end();
  console.log("Node list");
  console.dir(nodeList, { maxArrayLength: null });

  // console.log("final list:");
  // nodeList.forEach((data) => console.log(data));
}
