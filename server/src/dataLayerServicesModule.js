const axios = require("axios");
const fs = require('fs')
const schedule = require('node-schedule')
let serverReadyState = true;
let callInterval = 100;
let minStr = 2
let cache = {}


//GET DATA MODULE ####################################################

const getData = (str, cb) => {


    //API FUNCTIONS ###################################################

    //Schedule API call every midnight to update JSON file
    schedule.scheduleJob('00***', () => {

        const url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&rows=10000&facet=country&refine.country=il"

        apiCall(url)
    })


    const apiCall = (url) => {
        axios.get(url)
            .then(response => {
                let dataArr = []
                response.data.records.forEach(item => dataArr.push(item.fields.city))
                let arrJSON = JSON.stringify(dataArr)

                fs.writeFile(__dirname + '/../cityList.json', arrJSON, (err) => {
                    if (err) console.log(err)
                    console.log("JSON FILE UPDATED FROM API")
                })
                    .catch(error => { console.log("API LOAD ERROR:", error) })
            })
    }

    //PRACTICAL FUNCTIONS #############################################


    const readWordFile = (str, cb) => {
        fs.readFile(__dirname + "/../cityList.json", (err, data) => {
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

    //To prevent too frequent calls for data, time set above in CallInterval
    const timeoutReadyState = () => {
        serverReadyState = false
        setTimeout(() => {
            serverReadyState = true
            console.log("TIMER SETS READY STATE TO:", serverReadyState)
        }, callInterval)
    }


    // CACHE FUNCTIONS ################################################

    //Check if request is in cache
    const newRequest = (str) => {
        if (Object.keys(cache).some(x => x == str)) {
            console.log("This has been enetered before")
            return false
        }
        return true
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



    // DATA HANDLER ################################################

    try {
        if (str.length >= minStr) {
            if (newRequest(str)) {
                if (serverReadyState == true) {
                    timeoutReadyState();
                    readWordFile(str, cb)
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