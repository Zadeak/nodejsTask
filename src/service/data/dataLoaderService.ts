import { routesDao } from "../../database/databasePersistence";
import { delay } from "../../helperfunctions";
import { logger } from "../../logger";
import { asyncWriteAirportsDataFromFile, asyncWriteRoutesDataFromFile, counter, writeRoutesDao } from "./dataLoader";


export async function loadData(){
    await asyncWriteAirportsDataFromFile();
    await asyncWriteRoutesDataFromFile();
    while (counter < 67000) {
      await delay(1000);
    }
    await writeRoutesDao();
    logger.info("data is loaded");
}


