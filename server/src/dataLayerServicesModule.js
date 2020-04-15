const axios = require("axios");
const fs = require('fs')
let x = 1; // 0 calls API, 1 calls local file
let serverReadyState = true;
let callInterval = 200;
let minStr = 2
let cache = {}
const filePath = __dirname + "/../textFile1.json";

//GET DATA FUNCTION ####################################################


    //PURE FUNCTIONS ###################################################

const getData = function (str, cb) {


    ///VARIBLES

    const readWordFile = (str, cb) => {
        
        fs.readFile(filePath, (err, data) => {
            if (err) console.log(err)
            buildWordArr(str, JSON.parse(data), cb)
        })

}

    const buildWordArr = (str, data, cb) => {
        try {
            const regex = new RegExp(`^${str}`, 'gi');
            let response = data.filter(word => {
                return word.match(regex);
            }).slice(0, 10);
            if (response.length == 0) response = ['no results found']
            addToCache(str, response)
            cb(null, response)
        }
        catch (error) {
            cb(error)
        }
    }

    const apiCall = (str, url, cb) => {
        axios.get(url)
            .then(response => {
                let dataArr = []
                console.log(response.data.records[1].fields.city)
                response.data.records.forEach(item => dataArr.push(item.fields.city))
                let arrJSON = JSON.stringify(dataArr)

                fs.writeFile(filePath, arrJSON, (err) => {
                    if (err) console.log(err)
                    console.log("JSON FILE UPDATED FROM API", x)
                    readWordFile(str, cb)
                })
                    .catch(error => { console.log("The errrrrrrror", error) })
            })

            .catch(error => {console.log("The errrrrrrror" + error)})


    }

    const timeoutReadyState = () => {
        serverReadyState = false
        setTimeout(() => {
            serverReadyState = true
            console.log("TIMER SETS READY STATE TO:", serverReadyState)
        }, callInterval)
    }

    const addToCache = (str, response) => {
        //if (error) cb(error)
        let arr = []
        response.forEach(x => arr.push(x))
        cache[str] = arr;
        console.log("cache add: ", cache, "end of cache")
    }

    const pullFromCache = (str, cb) => {
        //if (error) cb(error)
        console.log("cache pull: ", cache, "end of cache")
        cb(null, cache[str])
    }

    const newRequest = (str) => {
        if (Object.keys(cache).some(x => x == str)) {
            console.log("This has been enetered before")
            return false
        }
        return true
    }

    // DATA HANDLER ################################################

    try {
        if (str.length >= minStr) {
            if (newRequest(str)) {
                if (serverReadyState == true) {
                    timeoutReadyState();
                    //temp load once
                    if (x < 1) {
                        // const url = "https://restcountries.eu/rest/v2/"
                        const url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&rows=10000&facet=country&refine.country=il"
                        x = x + 1
                        apiCall(str, url, cb)
                    } else {
                        readWordFile(str, cb)
                    }
                } else new TypeError("server timed out")
            } else {
                pullFromCache(str, cb)
            }
        } else new TypeError("string not long enough")
    }
    catch (error) {
        console.log("Error:", error)
    }

}

module.exports = {
    getData: getData
};