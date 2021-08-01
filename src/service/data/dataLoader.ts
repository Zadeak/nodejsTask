import * as fs from "fs";
import * as rd from "readline";
import * as database from "../../database/databasePersistence";
export var counter:number = 0;




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
          await database.routesDirty.put(startAirportId+":"+destinationAirportId, {
            StartAirportId: startAirportId.toString(),
            DestinationAirportId: destinationAirportId,
          });
          counter++
        }
      );
      resolve(()=>{});
    });
  }