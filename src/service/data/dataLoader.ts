import * as fs from "fs";
import * as rd from "readline";
import * as database from "../../database/databasePersistence";
export var counter:number = 0;

import{groupBy} from "lodash";




function createStreamReader(path: string) {
  return rd.createInterface(fs.createReadStream(path));
}

export function asyncWriteAirportsDataFromFile(): Promise<void> {
  return new Promise((resolve) => {
    createStreamReader("./src/resources/airports.dat.txt").on(
      "line",
      (l: string) => {
        var tokens = l.split(",");
        var nr = parseInt(tokens[0]);
        var name = tokens[1];
        name = name.substring(1,name.length-1);
        var city = tokens[2];
        var country = tokens[3];
        var iata = tokens[4].slice(1, 4);
        var icao = tokens[5].slice(1, 5);
        var latitude = tokens[6];
        var longitude = tokens[7];
        database.airportsDAO.put(nr.toString(), {
          Id: nr,
          Name: name,
          City: city,
          Country: country,
          IATA: iata,
          ICAO: icao,
          Latitude: +latitude,
          Longitude: +longitude,
        });
        database.airportIdDao.put(nr.toString(),{  Id: nr,
          IATA: iata,
          ICAO: icao})
      }
    );
    resolve();
  });
}

export function asyncWriteRoutesDataFromFile() {
    return new Promise((resolve, rejects) => {
      createStreamReader("./src/resources/routes.dat.txt").on(
        "line",
        async (l: string) => {
          var tokens = l.split(",");
          var startAirportId = tokens[3];
          var destinationAirportId = tokens[5];
          database.routesDirty.put(startAirportId+":"+destinationAirportId, {
            StartAirportId: startAirportId.toString(),
            DestinationAirportId: destinationAirportId,
          });
          counter++
        }
      );
      resolve(()=>{});
    });
  }


  export function writeRoutesDao(){
    return new Promise(async (resolve)=>{
      var routesDbArray = await database.routesDirty.find({});
      var filteredArray = routesDbArray.filter((v,i,a)=>a.indexOf(v)==i).filter((value)=>value.StartAirportId !== "\\N").filter((value)=> value.DestinationAirportId !== "\\N")

      var grouped = groupBy(filteredArray, function(car) {
        return car.StartAirportId;
      });

      for (var indexAr in grouped){
        var tempArr:any = []
        for(var inderG of grouped[indexAr]){
          tempArr.push(inderG.DestinationAirportId)
        }
        var name = grouped[indexAr][0].StartAirportId;
        database.routesDao.put(name,{StartAirportId:name,DestinationAirportId: tempArr})
      }
    resolve(()=>{});
  });
}
