import {
  asyncWriteAirportsDataFromFile,
  asyncWriteRoutesDataFromFile,
  // readMyFile,
} from "./PopulateDb";
import * as database from "./database";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const packages = require("../package.json");

// writeAirportsDataFromFile().then(()=>{
//     database.airportsDb.forEach((data) => console.log(data));
// });

// const wat = writeAirport.then(()=>{
//     database.airportsDb.forEach((data)=> {console.log(data)});
// })

// (async () => {
//   const val1 = await asyncWriteRoutesDataFromFile();
//   const val2 = await asyncWriteAirportsDataFromFile();
//   const val3 = await database.routesDb.find({
//     where: (route) => route.StartAirportId === "3370",
//   });

//   console.log(val3[0]);
//   var arr: Array<string>=[];
//   for( var i of val3){
//     // console.log(i.DestinationAirportId);
//     arr.push(i.DestinationAirportId.toString());
//     // console.log(arr);
//   }
//   console.log(arr);

//   var lol:Route = {StartAirportId:val3[0].StartAirportId, DestinationAirportId: arr};
//   console.log(lol);
// })();

(async () => {
  const val1 = await asyncWriteRoutesDataFromFile();
  const val2 = await asyncWriteAirportsDataFromFile();
  const val3 = await database.routesDAO.find({
    where: (route) => route.StartAirportId === "3370",
  });

  var route = await database.getRoute("3370");
  // console.log(route);

  // console.log(route);
  // var value = readMyFile("./src/resources/routes.dat.txt");

  // console.log(val3);
  // route.DestinationAirportId.forEach((data) => console.log(data));

  // database.routesDb.get("2968").then((data: any) => console.log(data));
})();

// console.log("hell yeah!");

// showData(6);

const port = process.env.port || 3000;

const app = express();
const apiRoot = "/api";
//configure app

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/localhost/ }));
app.options("*", cors());

// config routes
const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.send(`${packages.description} - ${packages.version}`);
});

// async dbquery endpoint
router.get("/test", async (req: any, res: any) => {
  try {
    var result = await database.routesDAO.find({
      where: (route) => route.StartAirportId === "3370",
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).end(error);
  }
});

//register all our routes
app.use(apiRoot, router);

app.listen(port, () => {
  console.log("server is up!");
});
function createRoute(val3: RouteDb[]) {
  console.log(val3[0]);
  var arr: Array<string> = [];
  for (var i of val3) {
    // console.log(i.DestinationAirportId);
    arr.push(i.DestinationAirportId);
    // console.log(arr);
  }
  console.log(arr);

  var lol: Route = {
    StartAirportId: val3[0].StartAirportId,
    DestinationAirportId: arr,
  };
  // console.log(lol);
  console.log(lol.DestinationAirportId[2]);
}
