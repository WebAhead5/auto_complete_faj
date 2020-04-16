const test = require("tape");
// const supertest = require("supertest");
// const axios = require("axios");
// const fs = require('fs')
// const schedule = require('node-schedule')
const dataFunctions = require("../src/dataLayerServicesModule.js");



// let serverReadyState = true;
// let callInterval = 100;
// let minStr = 2
// let cache = {}

//#####################################################################

//TEST VARIBLES



//#####################################################################
//EXAMPLE TEST

test('Example test', function (t) {
    // t.pass();
    var actual = "1";
    var expected = "1";
    t.equal(actual, expected, "test")
    t.end();
});


//#####################################################################
//FUNCTION TESTS


test('Type return of function', function (t) {
    dataFunctions.getData("hai", (err, res) => {
        if (err) return err
        else {
            var expected = 'object'
            t.deepEqual(typeof res, expected, "should return array 'Object'")
            t.end();
        }
    })

})


test('Test that "hai" returns Haifa', function (t) {
    dataFunctions.getData("hai", (err, res) => {
        if (err) return err
        else {
            var expected = ["haifa"];
            t.deepEqual(res, expected, "should return Haifa")
            t.end();
        }
    })

});


test('Test that entries in UPPERCASE still returns rxpected results', function (t) {
    dataFunctions.getData("HAI", (err, res) => {
        if (err) return err
        else {
            var expected = ["haifa"];
            t.deepEqual(res, expected, "should return Haifa despite caps")
            t.end();
        }
    })

});


// test('Test that "naza" returns 3 results', function (t) {
//     dataFunctions.getData("naza", (err, res) => {
//         if (err) return err
//         else {
//             var actual = res.length
//             var expected = 3;
//             t.deepEqual(actual, expected, "should return Haifa")
//             t.end();
//         }
//     })

// });


// test('Test that "h" triggers error', function (t) {
//     dataFunctions.getData("hai", (err, res) => {
//         if (err) {
//             var expected = "string not long enough"
//             t.deepEqual(err.message, expected, "should return error")
//             t.end();
//         }
//         else {
//             return res
//         }
//     })
// });


// test('Check max length of response is no more than 10', function (t) {
//     dataFunctions.getData("te", (err, res) => {
//         if (err) return err
//         else {
//             var actual = res.length
//             var expected = 10
//             t.equal(actual, expected, "max length of results should be 10")
//             t.end();
//         }
//     })
// });


// test('When no results are found, returns message', function (t) {
//     dataFunctions.getData("bhfwvmw", (err, res) => {
//         if (err) return err
//         else {
//             var expected = ['no results found']
//             t.deepEqual(res, expected, "testing no results msg should be returned")
//             t.end();
//         }
//     })

// });


// test('Test that cache is collecting information', function (t) {
//     var cache = {}
//     dataFunctions.getData("hai", (err, res) => {
//         if (err) return err
//         else {
//             var actual = cache
//             var expected = { "hai": ['haifa'] }
//             t.equal(actual, expected, "cahce should contain Haifa key and array value")
//             t.end();
//         }
//     })

// });

