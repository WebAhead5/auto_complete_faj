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

    ///VARIBLES

    let callInterval = 1000 //(in MS) time between calls
    let minLetters = 3; // num of letters when server call tirrgers
    let lastInputs = {};
    // let cacheSize = 4;


    ////PURE FUNCTIONS

    const apiCall = (str, url, cb) => {
        fetch(url) //params to limit data received and or seach terms
            .then(response => response.json())
            .then(response => {
                addToCache(str, response, cb);
            })
            .catch(error => {console.log("The errrrrrrror")})
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
        lastInputs[str] = response
        let arr = []
        console.log(Object.keys(response).forEach(x => arr.push(response[x].meta.id)))
        console.log("cache: ", lastInputs)
        cb(null, arr)
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

    const apiKey = "9d4bc33c-11e5-46ad-be0f-64175e15545f"

    try {
        if (str.length >= minLetters) {
            if (!newRequest(str)) {
                pullFromCache(str, cb)
                console.log(str.length, serverReadyState, "Cache Called")
            }
            else if (newRequest(str) && serverReadyState) {
                let url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${str}?key=${apiKey}`
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




// inputBar.addEventListener('input', () => getResults(str, cb)) // Event listener on type in input bar


module.exports =  {
    getData : getData
};

