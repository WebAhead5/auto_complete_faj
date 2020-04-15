/* eslint-disable no-unused-vars */

function myFunction() {
    var InputEl = document.getElementById("Sbox")
    var inputval = InputEl.value;
        
    if (inputval.length <= 3) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++)
            x[i].parentNode.removeChild(x[i]);

    } else {
        giveResults(inputval);
    }
}
        //console.log( arr);



/*
function GetInput()
{

    var InputEl=document.getElementById("Sbox")
    var InputVal=InputEl.value;
        // eslint-disable-next-line no-undef
        giveResults(InputVal);
}


// eslint-disable-next-line no-unused-vars
function GiveResult(InputVal,cb)//
{

return {'1':'2',
'3':'3'
}}

*/