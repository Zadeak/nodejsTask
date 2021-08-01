type Airport = {
  Id: number;
  Name: string;
  City: string;
  Country: string;
  IATA: string;
  ICAO: string;
  Latitude: number;
  Longitude: number;
};

type RouteDb = {
  StartAirportId: string;
  DestinationAirportId: string;
};

type Route = {
  StartAirportId: string;
  DestinationAirportId: Array<string>;
};

type AirportId = {
  Id: number;
  IATA: string;
  ICAO: string;
};

type Coordinates = {
  firstlat: number;
  firstlon: number;
  secondlat: number;
  secondlon: number;
};
type PathResponse = {
  airportsCodes: string[];
  totalDistance: number;
};
