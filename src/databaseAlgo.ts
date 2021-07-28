import * as jsGraph from "js-graph-algorithms";
import * as database from "./database";
import {
  asyncWriteAirportsDataFromFile,
  asyncWriteRoutesDataFromFile,
} from "./PopulateDb";
import * as fs from "fs";
import { showData } from "./Graph";

const geodist = require("geodist");


// var testArray = [[0,1,5],[1,2,7]];
// var g = new jsGrapg.WeightedDiGraph(200);

// for( var testArrayData of testArray){
//   var startdes = testArrayData[0];
//   var endDest = testArrayData[1];
//   var dist = testArrayData[2];
//   g.addEdge(new jsGrapg.Edge(startdes,endDest,dist));
// }

// console.log(g);

//  showData(g,2);

function addtoG(g:jsGraph.WeightedDiGraph, edge:jsGraph.Edge){
  g.addEdge(edge)
return g;
}

(async () => {

  await asyncWriteRoutesDataFromFile();
  await asyncWriteAirportsDataFromFile();
  // const testnum = await database.routesDAO.count();
  var route = await database.getRoute("2966");
  console.log(route);
  var edges = await test(1, route);
  
  // const testArray = [[0,1,5],[1,2,3],[2,4,5]];

  // var g = new jsGraph.WeightedDiGraph(testArray.length);

  // for (const testArrayData of testArray){
  //   g.addEdge(new jsGraph.Edge(testArrayData[0], testArrayData[1],testArrayData[2]))
  // }

  // addtoG(g, new jsGraph.Edge(0, 1, 2));

  // console.log(g);
  // showData(g, "373")
  // console.log("");



})();

export async function test(depth: number, startingPoint: Route) {
  var edges = [];
  for (var it of startingPoint.DestinationAirportId) {
    var { startAirportLat, startAirportLon, destAirportLat, destAirportLon } =
      await getCoorinates(startingPoint.StartAirportId, it);

      const newLocale = [
        Number.parseInt(startingPoint.StartAirportId),
        Number.parseInt(it),
        calculateDistance(
          startAirportLat,
          startAirportLon,
          destAirportLat,
          destAirportLon
        )
      ] 
    edges.push(newLocale);

    var g = new jsGraph.WeightedDiGraph(edges.length);

    for (const testArrayData of edges){
      g.addEdge(new jsGraph.Edge(testArrayData[0], testArrayData[1],testArrayData[2]))
    }
  
    addtoG(g, new jsGraph.Edge(0, 1, 2));



  }
  console.log(edges);


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

        // for (var i of newRoute.DestinationAirportId) {
        //   const newLocal = new jsgraphs.Edge(newRoute.StartAirportId, i, 5.0);
        //   edges.push(newLocal);
        // }

        for (var it of newRoute.DestinationAirportId) {
          var {
            startAirportLat,
            startAirportLon,
            destAirportLat,
            destAirportLon,
          } = await getCoorinates(newRoute.StartAirportId, it);

          const newLocal = new jsGraph.Edge(
            Number.parseInt(newRoute.StartAirportId),
            Number.parseInt(it),
            calculateDistance(
              startAirportLat,
              startAirportLon,
              destAirportLat,
              destAirportLon
            )
          );
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

    nodeList.push.apply(nodeList, tempList);
    // nodeList.push(tempList);
    // nodeList = nodeList.concat(tempList);

    tempList = [];
    depthCounter++;
  }
  // console.log(edges);

  // var text = "";

  // for (var d of edges) {
  //   var lol = JSON.stringify(d);
  //   text.concat(lol + "\n");
  // }
  // console.log(text);
  // fs.writeFileSync("outputfile.txt", text);

  // let writeStream = fs.createWriteStream("outputfile.txt");
  // for (var d of edges) {
  //   var lol = JSON.stringify(d);
  //   writeStream.write(lol + "\n", "utf-8");
  // }
  // writeStream.on("finish", () => {
  //   console.log("wrote all data to file");
  // });
  // writeStream.end();
  // console.dir(nodeList, { maxArrayLength: null });
  // console.log("Node list");
  //   console.dir(nodeList, { maxArrayLength: null });
  //   // nodeList.forEach((data)=>console.log(data));
  // function returnDataName(element:Route,index:any,array:any){
  //  return(element.StartAirportId)
  // }
  //   const filteredList = nodeList.filter(returnDataName);
  //   console.log(filteredList);
  //   for(var i of filteredList){
  //     console.log(i.StartAirportId);
  //   }
  console.log(edges);
  //
  // var str = JSON.stringify(nodeList);
  // console.log(str);
  // console.log("final list:");
  // nodeList.forEach((data) => console.log(data));
  return edges;
}

async function getCoorinates(startingPoint: string, destinationPoint: string) {
  var startAirport = await database.getAirportDataById(
    Number.parseInt(startingPoint)
  );
  var destAirport = await database.getAirportDataById(
    Number.parseInt(destinationPoint)
  );
  var startAirportLat = startAirport.Latitude;
  var startAirportLon = startAirport.Longitude;
  var destAirportLat = destAirport.Latitude;
  var destAirportLon = destAirport.Longitude;
  return { startAirportLat, startAirportLon, destAirportLat, destAirportLon };
}

function calculateDistance(
  firstLat: number,
  firstLon: number,
  secondlat: number,
  secondLon: number
) : number {
  return geodist(
    { lat: firstLat, lon: firstLon },
    { lat: secondlat, lon: secondLon },
    { exact: true, unit: "km" }
  );
}
