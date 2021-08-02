import { logger } from "../../logger";
import { asyncWriteAirportsDataFromFile, asyncWriteRoutesDataFromFile, writeRoutesDao } from "./dataLoader";


export async function loadData(){
    await asyncWriteRoutesDataFromFile();
    await asyncWriteAirportsDataFromFile();
    await writeRoutesDao();
    logger.info("data is loaded");
}


