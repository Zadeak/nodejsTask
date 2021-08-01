import { delay } from "../../helperfunctions";
import { logger } from "../../logger";
import { asyncWriteAirportsDataFromFile, asyncWriteRoutesDataFromFile, counter } from "./dataLoader";


export async function loadData(){
    await asyncWriteAirportsDataFromFile();
    await asyncWriteRoutesDataFromFile();
    while (counter < 67000) {
      await delay(1000);
    }
    logger.debug("data is loaded");
}


