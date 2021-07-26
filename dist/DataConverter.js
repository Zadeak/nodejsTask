"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToRoute = void 0;
function convertToRoute(val3) {
    var arr = [];
    for (var i of val3) {
        arr.push(i.DestinationAirportId.toString());
    }
    var lol = {
        StartAirportId: val3[0].StartAirportId,
        DestinationAirportId: arr,
    };
    return lol;
}
exports.convertToRoute = convertToRoute;
//# sourceMappingURL=DataConverter.js.map