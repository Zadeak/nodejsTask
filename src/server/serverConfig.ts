const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


export function configureServer(){
    const app = express();
    //configure app
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // app.use(express.json);
    app.use(cors({ origin: /http:\/\/localhost/ }));
    app.options("*", cors());
    

    return app;
}


