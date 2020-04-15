const axios = require("axios");
const fs = require('fs')
let x = 1;
let serverReadyState = true;
let callInterval = 2000;
let minStr = 3
let cache = {}

//GET DATA FUNCTION ####################################################

const getData = (str, cb) => {
    try {
        if (str.length >= minStr) {
            if (newRequest()) {
                if (serverReadyState == true) {
                    timeoutReadyState();
                    //temp load once
                    if (x < 1) {
                        const url = "apiurl";
                        x++

                        let updatedData = apiCall(url)
                        let dataArr = updatedData.forEach(result => dataArr.push(updatedData[result].name))
                        let arrJSON = JSON.stringify(dataArr)

                        fs.writeFile(__dirname + '/textFile.json', arrJSON, (err) => {
                            if (err) console.log(err)
                            readWordFile(str, cb)
                        })
                    } else {
                        readWordFile(str, cb)
                    }
                } else new Error("server timed out")
            } else {
                pullFromCache(str, cb)
            }
        } else new Error("string not long enough")
    }
    catch (error) {
        console.log("Error:", error)
    }
}

const readWordFile = (str, cb) => {
    fs.readFile(__dirname + "/textFile.json", (err, data) => {
        if (err) console.log(err)
        console.log("FILE DATA:", JSON.parse(data))
        buildWordArr(str, JSON.parse(data), cb)
    })
}

const buildWordArr = (str, data, cb) => {
    try {
        const regex = new RegExp(`^${str}`, 'gi');
        let response = Object.keys(data).filter(word => {
            return word.match(regex);
        }).slice(0, 10);

        console.log("Filtered Arr Response:", response)
        addToCache(str, response)
        cb(null, response)
    }
    catch (error) {
        cb(error)
    }
}

const apiCall = (url) => {
    axios.get(url)
        .then(response => { return response })
        .catch(error => { console.log("The errrrrrrror", error) })
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


module.exports = {
    getData: getData
};