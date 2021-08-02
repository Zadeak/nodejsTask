import { delay } from "../../helperfunctions";
import { logger } from "../../logger";
import { asyncWriteAirportsDataFromFile, asyncWriteRoutesDataFromFile, counter, writeRoutesDao } from "./dataLoader";


export async function loadData(){
    await asyncWriteRoutesDataFromFile();
    while (counter < 67000) {
      await delay(200);
    }
    await asyncWriteAirportsDataFromFile();
    await writeRoutesDao();
    logger.info("data is loaded");
}


