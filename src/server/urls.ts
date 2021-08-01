import{ configureServer} from "./serverConfig";
const express = require("express");
const packages = require("../../package.json");
import * as database from "../database/databasePersistence";


const app = configureServer();

export function configureUrls(app:any){
    const port = process.env.port || 3000;

    // const port = app.port; 
    const apiRoot = "/api";
    const router = express.Router();



    //test endpoint
router.get("/", (req: any, res: any) => {
  res.send(`${packages.description} - ${packages.version}`);
});

//test endpoint
router.get("/test", async (req: any, res: any) => {
    try {
      var result = await database.routesDirty.find({
        where: (route: { StartAirportId: string; }) => route.StartAirportId === "3370",
      });
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).end(error);
    }
  });


  router.post("/post", (req: any, res:any)=>{
    
    res.json(req.body);
  })




  app.use(apiRoot, router);

app.listen(port, () =>console.log( `API running at localhost:${port}`))}
