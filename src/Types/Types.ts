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

type Route = {
  StartAirportId: string;
  DestinationAirportId: string;
};
