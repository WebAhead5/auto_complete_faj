/* eslint-disable no-undef */
const express = require('express');

const serverServicesModule = require("./src/server_services");

const app = express();

app.get("/posts",(req,response) =>{
    var string = req.query.string;
    console.log(string);
    serverServicesModule.getResults(string,(error,data) => {
            if(error) {
                throw error;
            }
            console.log(data);
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end(JSON.stringify(data));
    })
})

app.use(express.static('client/public'));

module.exports = app;