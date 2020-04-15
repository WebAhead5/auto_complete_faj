/* eslint-disable no-undef */
const express = require('express');
const PORT = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');
const serverServicesModule = require("./src/server_services");

const app = express();

app.get("/posts",(req,response) =>{
    var string = req.query.string;
    console.log(string);
    serverServicesModule.getResults(string,(error,data) => {
      //  const filePath = path.join(__dirname,'posts.json');
      //  fs.readFile(filePath,'utf8', (error,data) => {
            
            if(error) {
                console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"+ error);
                throw error;
            }
            console.log(data);
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end(JSON.stringify(data));
        //});
    })
})

app.use(express.static('client/public'));


app.listen(PORT,()=>
    console.log(`Server is running at Port ${PORT}, and waiting for requests`));

module.exports = app;