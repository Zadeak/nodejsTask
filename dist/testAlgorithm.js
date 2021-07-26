"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
var firstOne = { num: 1, linkedArray: [2, 3] };
function test() {
    var depth = 1;
    console.log(depth);
    var nodeList = [firstOne];
    var tempList = [];
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
                var newOne = { num: 2, linkedArray: [4, 5] };
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
exports.test = test;
test();
//# sourceMappingURL=testAlgorithm.js.map