import { getAirportDataByCode } from "../database/databasePersistence";



export async function validateInput(...args:any){

    for (var arg of args){
        const airportData = await getAirportDataByCode(arg);
        if(airportData.length === 0){
            return {status:undefined, input:arg};
        }
    }
    return {status:"OK",input:args};

    

}