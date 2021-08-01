import { Depot } from "depot-db";
import { routeConverter } from "../service/data/DataConverter";

export const airportsDAO = new Depot<Airport>("Airports");
export const routesDirty = new Depot<RouteDb>("Routes");
export const routesDao = new Depot<Route>("RouteObjecs");
export const airportIdDao = new Depot<AirportId>("airportId");

export async function getAirportIdByCode(airportCode: string): Promise<number> {
  try {
    const airportData = await airportIdDao.find({
      where: (airport) => airport.IATA === airportCode,
    });
    console.log(
      `found airport by code IATA: ${airportCode} in AirportId table`
    );

    return airportData[0].Id;
  } catch (error) {
    console.log(
      `airport code IATA ${airportCode} is not found in airportIdDao`
    );
  }
  try {
    const airportData = await airportIdDao.find({
      where: (airport) => airport.ICAO === airportCode,
    });
    console.log(
      `found airport by code ICAO: ${airportCode} in AirportId table`
    );

    return airportData[0].Id;
  } catch (error) {
    console.log(
      `airport code ICAO ${airportCode} is not found in airportIdDao`
    );
  }

  const airportDataArray = await getAirportDataByCode(airportCode);
  const airportData = airportDataArray[0];
  const airportId = airportData.Id;
  const airportIATA = airportData.IATA;
  const airportICAO = airportData.ICAO;
  await airportIdDao.put(airportId.toString(), {
    Id: airportId,
    IATA: airportIATA,
    ICAO: airportICAO,
  });

  console.log(`Saved airport by code ${airportCode} to airportID table`);
  return airportId;
}

export async function getRoute(airportId: string): Promise<Route> {
  var routeDbEntryArray: any;

  try {
    routeDbEntryArray = await routesDao.get(airportId);
    console.log("found in routeObject table");
    return routeDbEntryArray;
  } catch (e) {
    console.log(airportId + " not found in routeObject Table");
  }

  try {
    routeDbEntryArray = await routesDirty.find({
      where: (route) => route.StartAirportId == airportId,
    });
  } catch (e) {
    console.log(e);
    console.log("Key: " + airportId);
  }
  return routeConverter(routeDbEntryArray);
}

export async function getAirportDataByCode(airportId: string) {
  var airportData;
  airportData = await airportsDAO.find({
    where: (airport) => airport.IATA === airportId,
  });

  if (airportData.length === 0) {
    airportData = await airportsDAO.find({
      where: (airport) => airport.ICAO === airportId,
    });
  }

  return airportData;
}
export async function getAirportDataById(airportId: number) {
  const airportData = await airportsDAO.get(airportId.toString());
  return airportData;
}

export async function writeRoutes(
  startAirportId: string,
  destinationAirportId: string
) {
  await routesDirty.put(startAirportId.toString(), {
    StartAirportId: startAirportId.toString(),
    DestinationAirportId: destinationAirportId,
  });
}
