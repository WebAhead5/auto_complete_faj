const test = require("tape");
// const supertest = require("supertest");
// const axios = require("axios");
// const fs = require('fs')
// const schedule = require('node-schedule')
const dataFunctions = require("../src/dataLayerServicesModule");



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
    var actual = typeof (dataFunctions.getData("hai", (err, res) => {
        if (err) return err
        else {
            return res;
        }
    }))
    var expected = 'Object'
    t.equal(actual, expected, "should return array 'Object'")
    t.end();
})


test('Test that "hai" returns Haifa', function (t) {
    var actual = dataFunctions.getData("hai", (err, res) => {
        if (err) return err
        else {
            return res;
        }
    })
    var expected = ["haifa"];
    t.equal(actual, expected, "should return Haifa")
    t.end();
});


test('Test that entries in UPPERCASE still returns rxpected results', function (t) {
    var actual = dataFunctions.getData("HAI", (err, res) => {
        if (err) return err
        else {
            return res;
        }
    })
    var expected = ["haifa"];
    t.equal(actual, expected, "should return Haifa despite caps")
    t.end();
});


test('Test that "naza" returns 3 results', function (t) {
    var response = dataFunctions.getData("hai", (err, res) => {
        if (err) return err
        else {
            return res;
        }
    }) || 0
    var actual = response.length
    var expected = ["haifa"];
    t.equal(actual, expected, "should return Haifa")
    t.end();
});


test('Test that "h" triggers error', function (t) {
    var actual = dataFunctions.getData("hai", (err, res) => {
        if (err) return err
        else {
            return res;
        }
    })
    var expected = TypeError("string not long enough")
    t.equal(actual, expected, "should return error")
    t.end();
});


test('Check max length of response is no more than 10', function (t) {
    var response = dataFunctions.getData("te", (err, res) => {
        if (err) return err
        else {
            return res;
        }
    }) || 0
    var actual = response.length
    var expected = 10
    t.equal(actual, expected, "max length of results should be 10")
    t.end();
});


test('When no results are found, returns message', function (t) {
    var actual = dataFunctions.getData("bhfwvmw", (err, res) => {
        if (err) return err
        else {
            return res;
        }
    })
    var expected = ['no results found']
    t.equal(actual, expected, "testing no results msg should be returned")
    t.end();
});


test('Test that cache is collecting information', function (t) {
    var cache = {}
    dataFunctions.getData("hai", (err, res) => {
        if (err) return err
        else {
            return res;
        }
    })
    var actual = cache
    var expected = { "hai": ['haifa'] }
    t.equal(actual, expected, "cahce should contain Haifa key and array value")
    t.end();
});




// test("route to index.html", t => {
//     supertest(app)
//         .get("/")
//         .expect(200)
//         .expect("content-type", "text/html; charset=UTF-8")
//         .end((err, res) => {
//             t.error(err);
//             t.end();
//         });
// });
