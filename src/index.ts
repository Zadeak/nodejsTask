import {showData} from "./Graph";
import {asyncWriteRoutesDataFromFile, asyncWriteAirportsDataFromFile} from "./PopulateDb";
import * as database from "./database";


const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const packages = require('../package.json');

// writeAirportsDataFromFile().then(()=>{
//     database.airportsDb.forEach((data) => console.log(data));
// });

// const wat = writeAirport.then(()=>{
//     database.airportsDb.forEach((data)=> {console.log(data)});
// })

(async ()=>{
    const val1 = await asyncWriteRoutesDataFromFile();
    const val2 = await asyncWriteAirportsDataFromFile();
    const val3 = await database.routesDb.find({
        where: route => route.StartAirportId === "3370"
    })
    console.log(val3);

})();
console.log("hell yeah!");
// showData(6);



const port = process.env.port || 3000;

const app = express();
const apiRoot = '/api';
//configure app


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: /http:\/\/localhost/}));
app.options('*', cors());

// config routes
const router = express.Router();

router.get('/',(req:any,res:any)=>{
    res.send(`${packages.description} - ${packages.version}`);
})

//register all our routes
app.use(apiRoot,router);

app.listen(port, ()=>{
    console.log("server is up!");
});












