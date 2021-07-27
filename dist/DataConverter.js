"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeConverter = void 0;
function routeConverter(routeDbArray) {
    var arr = [];
    for (var i of routeDbArray) {
        arr.push(i.DestinationAirportId.toString());
    }
    var ar = arr.filter((v, i, a) => a.indexOf(v) == i);
    var lol = {
        StartAirportId: routeDbArray[0].StartAirportId,
        DestinationAirportId: ar,
    };
    return lol;
}
exports.routeConverter = routeConverter;
//# sourceMappingURL=DataConverter.js.map