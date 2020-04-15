const fetch = require("node-fetch");
// const apiCall = require("./server)

// const inputBar = document.getElementById("inputBar")
// var str = inputBar.value


// const cb = (error, response) => {
//     if (error) console.log("Error:", error)
//     else {
//         console.log("Response:", response || "no data collected yet")
//     }
// }


//Global
let serverReadyState = true; // Is server ready to make a call



const getData = function (str, cb) {
    // str = inputBar.value // only for testing

    const apiID = "0bd79ebf"
    var apiKey = "64b3123fa2579590735373178f879858";

    ///VARIBLES

    let callInterval = 1000 //(in MS) time between calls
    let minLetters = 3; // num of letters when server call tirrgers
    let lastInputs = {};
    // let cacheSize = 4;


    ////PURE FUNCTIONS

    const apiCall = (str, url, cb) => {

        const options = {
            host: 'od-api.oxforddictionaries.com',
            port: '443',
            path: `api/v2/search/en-gb?q=${str}&prefix=true&limit=10`,
            method: "GET",
            headers: {
                "Accept": "application/json",
                'app_id': apiID,
                'app_key': apiKey
            }
        };

        fetch(url, options) //params to limit data received and or seach terms
            .then(response => response.json())
            .then(response => {
                addToCache(str, response, cb);
            })
            .catch(error => { console.log("The errrrrrrror", error) })
    }

    const timeoutReadyState = () => {
        serverReadyState = false
        setTimeout(() => {
            serverReadyState = true
            console.log("TIMER SETS READY STATE TO:", serverReadyState)
        }, callInterval)
    }

    const addToCache = (str, response, cb) => {
        //if (error) cb(error)

        let arr = []
        Object.keys(response).forEach(x => arr.push(response[x].meta.id))
        console.log("cache2: ", lastInputs)
        lastInputs[str] = arr
        cb(null, arr);
    }

    const pullFromCache = (str, cb) => {
        //if (error) cb(error)
        console.log("cache: ", lastInputs)
        cb(null, lastInputs[str])
    }

    const newRequest = (str) => {
        if (Object.keys(lastInputs).some(x => x == str)) {
            console.log("This has been enetered before")
            return false
        }
        return true
    }

    ////API CALL LOGIC


    // USE WITH AXIOS
    // const apiCall = (str, url, cb) => {


    //     axios.get(url, options) 
    //         .then(response => {
    //             addToCache(str, response, cb);
    //         })
    //         .catch(error => cb(error))
    // }







    // const apiKey = "9d4bc33c-11e5-46ad-be0f-64175e15545f"

    try {
        if (str.length >= minLetters) {
            if (!newRequest(str)) {
                pullFromCache(str, cb)
                console.log(str.length, serverReadyState, "Cache Called")
            }
            else if (newRequest(str) && serverReadyState) {
                // let url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${str}?key=${apiKey}`
                const url = `https://od-api.oxforddictionaries.com/api/v2/search/en-gb?q=${str}&prefix=true&limit=10`
                timeoutReadyState()
                apiCall(str, url, cb)
                console.log(str.length, serverReadyState, "API called")
            } else {
                console.log(str.length, serverReadyState, "API call on Timeout")
            }
        } else console.log(str.length, serverReadyState, "String Not Long Enough")
    }
    catch (error) {
        cb(error)
    }
}



// var str = inputBar.value




module.exports = {
    getData: getData
};

