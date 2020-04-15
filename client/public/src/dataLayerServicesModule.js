const axios = require("axios");
const fs = require('fs')


//GET DATA FUNCTION ####################################################

const getData = (str, cb) => {

    let x = 1
    if (x > 1) {
        const url = "apiurl";

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
        let response = data.filter(word => {
            return word.match(regex);
        }).slice(0, 10);

        console.log("Filtered Arr Response:", response)
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


module.exports = {
    getData: getData
};

