
// const apiCall = require("./server)
// const axios = require('axios')

let inputValue = "bar";
let callInterval = 5000 //(in MS) time between calls
let minLetters = 3; // num of letters when API tirrgers
let apiReadyState = true; // Is API ready to make a call
let cacheSize = 4;

let lastInputs = [];
const apiKey = "nnvpdfnbpfnb"

const inputBar = document.getElementById("inputBar")


const apiCall = (url, cb) => {
    fetch(url) //params to limit data received and or seach terms
        .then(response => cb(null, response))
        .catch(error => cb(error))
}

const apiTrigger = () => {
    try {
        if (inputBar.value.length >= minLetters && apiReadyState && newRequest()) { // add newRequest once built
            let url = `wwww.xyxvjonwjovn.com/fjwnvp${apiKey}&q=${inputValue}`
            url = "https://jsonplaceholder.typicode.com/users"//delete line once API found - this is for testing only
            apiCall(url, cb)
            resetReadyState()
            console.log(inputBar.value.length, apiReadyState, "API called")
        } else {
            console.log(inputBar.value.length, apiReadyState, "API not called yet")
        }
        addToCache();
    }
    catch (error) {
        console.log(error)
    }
}

const resetReadyState = () => {
    apiReadyState = false
    setTimeout(() => {
        apiReadyState = true
        console.log("TIMER SETS READY STATE TO:", apiReadyState)
    }, callInterval)
}

const addToCache = () => {
    lastInputs.push(inputBar.value)
    if (lastInputs.length > cacheSize) lastInputs = lastInputs.slice(1)
    console.log("cache: ", lastInputs)
}

const cb = (response, error) => {
    if (error) console.log(error)
    else {
        console.log(response) // add further actions like return data to DOM
    }
}

const newRequest = () => {
    console.log("NEWREQ:")
    console.log(inputBar.value, lastInputs)
    if (lastInputs.some(x => x == inputBar.value)) {
        console.log("this has been enetered before")
        return false
    }
    return true

}


inputBar.addEventListener('input', () => apiTrigger())