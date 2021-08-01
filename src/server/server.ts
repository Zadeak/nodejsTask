import{ configureServer} from "./serverConfig";
import {configureUrls} from "./urls";


export function launcher(){
    const app = configureServer();
    configureUrls(app);
}
