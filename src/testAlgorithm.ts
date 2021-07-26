import { Edge } from "js-graph-algorithms";

type TestTYpe = {
  num: number;
  linkedArray: Array<number>;
};

var firstOne: TestTYpe = { num: 1, linkedArray: [2, 3] };

export function test() {
  var depth = 1;
  console.log(depth);
  var nodeList: Array<TestTYpe> = [firstOne];
  var tempList: Array<TestTYpe> = [];
  while (depth != 0) {
    var prev = 0;
    var current = nodeList.length;
    console.log(prev);
    for (var edge in nodeList.slice(prev)) {
      //   var nodeEdge = nodeList[edge];
      //   nodeEdge.label = "first";
      // получить список всех путей из кода
      var extractedRoutes = nodeList[edge].linkedArray;
      for (var route in extractedRoutes) {
        // какая-то работа с путями
        // делаем edge | из edge -> route + weight
        var newOne: TestTYpe = { num: 2, linkedArray: [4, 5] };
        tempList.push(newOne);
      }
      prev = prev + tempList.length;
      nodeList.push.apply(nodeList, tempList);
      console.log("Afrer push apply" + nodeList + nodeList.length);
      nodeList.forEach((data) => {
        console.log("Num" + data.num);
        data.linkedArray.forEach((data) => {
          console.log(data);
        });
      });
      tempList = [];
    }
    depth--;
    console.log(depth + "after decriment");
  }
}

test();
