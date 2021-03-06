import{ configureServer} from "./serverConfig";
const express = require("express");
const packages = require("../../package.json");
import * as database from "../database/databasePersistence";
import { logger } from "../logger";
import { findShortestPath } from "../service/api/graphService";
import { validateInput } from "./inputValidation";


const app = configureServer();

export function configureUrls(app:any){
    const port = process.env.port || 3000;

    // const port = app.port; 
    const apiRoot = "/api";
    const router = express.Router();


  router.post("/main", async (req: any, res:any)=>{
    logger.info("Your request is beign processed. Please wait...");

    var from = req.body.from;
    var to = req.body.to;
    var validationResult = await validateInput(from,to);
    

    if (validationResult.status === undefined){
      res.status(400).send(`Invalid airport code: => ${validationResult.input}`)
    }
    else {
      logger.info("from: "+ from +" To: "+ to);
      const response = await findShortestPath(4, from, to);
      logger.info(response)
      var message = JSON.stringify(response)
      res.set('content-type', 'application/json');
      res.status(200).send(message);
    }


  })




  app.use(apiRoot, router);

app.listen(port, () =>logger.debug( `API running at localhost:${port}`))}
