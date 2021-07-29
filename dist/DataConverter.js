"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeConverter = void 0;
//TODO: save filtered and converted routes in db
function routeConverter(routeDbArray) {
    var arr = [];
    for (var i of routeDbArray) {
        arr.push(i.DestinationAirportId);
    }
    var ar = arr
        .filter((v, i, a) => a.indexOf(v) == i)
        .filter((value, index, array) => value !== "\\N");
    return {
        StartAirportId: routeDbArray[0].StartAirportId,
        DestinationAirportId: ar,
    };
}
exports.routeConverter = routeConverter;
//# sourceMappingURL=DataConverter.js.map