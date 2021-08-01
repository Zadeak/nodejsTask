import { delay } from "../../helperfunctions";
import { asyncWriteAirportsDataFromFile, asyncWriteRoutesDataFromFile, counter } from "./dataLoader";


export async function loadData(){
    await asyncWriteAirportsDataFromFile();
    await asyncWriteRoutesDataFromFile();
    while (counter < 67000) {
      await delay(1000);
    }
    console.log("route file is done loading");
}


