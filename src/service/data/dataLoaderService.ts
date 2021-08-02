import { logger } from "../../logger";
import { asyncWriteAirportsDataFromFile, asyncWriteRoutesDataFromFile, writeRoutesDao } from "./dataLoader";


export async function loadData(){
    await asyncWriteAirportsDataFromFile();
    await asyncWriteRoutesDataFromFile();
    await writeRoutesDao();
    logger.info("data is loaded");
}


