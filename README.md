start 1,"Goroka Airport",,"GKA","AYGA",
end 9,"Kangerlussuaq Airport","SFJ","BGSF"
3 stop in between 
Used for airport and routes between them -> https://openflights.org/data.html 
1) airports ->  https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat
2) routes - > https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat

pre-load data into embedded db tables. Then query them to get information needed
There are a few tables. 
routesDirty: start airport id(set by openflights.org) -> end airport id
routesDao: airportId -> array of all destination airports id
airportDao -> airport data by id(openflights)
airportsIdDao -> airport id(openflights), ICAO, IATA


Main logic in apiService-> graphAlgorithm.

I create first node from provided airport code. 
Then I query db tables and find all possible destination points.
Use them I construct additional nodes(if there is none already in the graph) and lay paths with distance in KM.
Check if a path from A to B can be constructed. If not append all added nodes to temp list and increment depth counter. Repeat for all added to temp list nodes until path is found.
If counter == set depth => it takes more than N stops(3 in this case, but can be changed).


Distance between stops are calculated "As the crows fly", from a to b in straight line. Distance is calculated from latitude and longitude.

json post example: 
{
    "from": "GKA",
    "to": "SFJ"
}

endpoints - http://localhost:3000/api/main