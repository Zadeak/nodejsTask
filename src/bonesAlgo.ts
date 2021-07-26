import { Edge } from "js-graph-algorithms";
import * as database from "./database";

type TestTYpe = {
  num: string;
  linkedArray: Array<string>;
};

var firstOne: TestTYpe = { num: "1", linkedArray: ["1", "1"] };

export function test(depth:number) {
  //temp value
  var number = "2";
  var depthCounter = 0;
  var tempListSize = 0;

  // console.log(depth);

  var nodeList: Array<any> = [firstOne];
  var tempList: Array<any> = [];

  while (depthCounter != depth) {
    // console.log("depth: " + depth);

    for (var entry in nodeList.slice(-tempListSize)) {
      //   var nodeEdge = nodeList[edge];
      //   nodeEdge.label = "first";
      // получить список всех путей из кода

      var extractedRoutes = nodeList[entry].linkedArray;
      // console.log("extractedRoute: " + nodeList[edge].linkedArray);
      for (var route in extractedRoutes) {
        // console.log("route: " + route);
        // какая-то работа с путями
        // делаем edge | из edge -> route + weight

        var newOne: TestTYpe = {
          num: number,
          linkedArray: [number, number],
        };
        tempList.push(newOne);
        var n = Number.parseInt(number);
        n++;
        number = n.toString();
        // console.log("created object newOne: " + newOne.num);
        // console.log(
        //   "tempList affter addition: " +
        //     tempList.forEach((data) => console.log(data))
        // );
      }
    }

    var tempListSize = tempList.length;

    console.log("size: " + tempListSize);

    nodeList.push.apply(nodeList, tempList);

    tempList = [];
    depthCounter++;
  }

  // console.log("final list:");
  nodeList.forEach((data) => console.log(data));
}

test(3);
