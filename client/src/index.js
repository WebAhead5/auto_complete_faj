
// const apiCall = require("./server)
// const axios = require('axios')

let inputValue = "bar";
let callInterval = 10000 //(in MS) time between calls
let minLetters = 3; // num of letters when API tirrgers
let apiReadyState = true; // Is API ready to make a call

// let lastInputs = ["b", "ba", "bal", "ball", "bal"]

const apiKey = "nnvpdfnbpfnb"

let url = `wwww.xyxvjonwjovn.com/fjwnvp${apiKey}&q=${inputValue}`


const inputBar = document.getElementById("inputBar")


const apiCall = (url, cb) => {
    fetch(url) //params to limit data received and or seach terms
        .then(response => cb(null, response))
        .catch(error => cb(error))
}

const apiTrigger = () => {
    try {
        if (inputBar.value.length >= minLetters && apiReadyState) { // add newRequest once built
            // url = `wwww.xyxvjonwjovn.com/fjwnvp${apiKey}&q=${inputValue}`
            url = "https://jsonplaceholder.typicode.com/users"
            apiCall(url, cb)
            apiReadyState = false
            setTimeout(() => {
                apiReadyState = true
                console.log("TIMER SETS READY STATE TO:", apiReadyState)
            }, callInterval)
            console.log(inputBar.value.length, apiReadyState, "API called")
        } else {
            console.log(inputBar.value.length, apiReadyState, "API not called yet")
        }
    }
    catch (error) {
        console.log(error)
    }
}


function cb(response, error) {

    if (error) console.log(error)
    else {

        console.log(response)

    }

}




// const newRequest = () => {

//     //check that request isnt one of the recent serches from the cache

// }

inputBar.addEventListener('input', () => apiTrigger())