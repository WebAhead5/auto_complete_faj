const fs = require('fs')
const axios = require("axios");



const getData = (str, cb) => {
    try {
        let wordList = getWordList()

        const regex = new RegExp(`^${str}`, 'gi');
        let response = wordList.filter(word => {
            return word.match(regex);
        }).slice(0, 10);

        cb(null, response)
    }
    catch (error) {
        cb(error)
    }
}




const getWordList = () => {

    ///UPDATE WORD LIST IF NOT UPDATED WITHIN 24HRS
    let x = 1
    if (x > 1) {
        const url = "apiurl";

        let updatedData = apiCall(url)
        let dataArr = updatedData.forEach(result => dataArr.push(updatedData[result].name))
        let arrJSON = JSON.stringify(dataArr)

        fs.writeFile('./textFile', arrJSON, (err) => {
            if (err) console.log(err)
            return readWordFile()
        })
    } else {
        return readWordFile()
    }
}


const readWordFile = () => {
    fs.readFile("./textFile", (err, data) => {
        if (err) console.log(err)
        return JSON.parse(data)
    })
}


const apiCall = (url) => {
    axios.get(url)
        .then(response => { return response })
        .catch(error => { console.log("The errrrrrrror", error) })
}



module.exports = {
    getData: getData
};

