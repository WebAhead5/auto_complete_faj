/* eslint-disable no-unused-vars */

const giveResults = function(str){
  var params = "string=" + str;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4){
        if (xhr.status === 200){
           var data = JSON.parse( xhr.responseText);
           
        
           var option1 = document.createElement("DIV");
           document.getElementById("Sbox").parentNode.appendChild(option1);
           option1.setAttribute("class", "autocomplete-items");
           data.forEach((value)=>{
             var b;
              b = document.createElement("DIV");
              b.innerHTML = "<strong>" + value.substr(0, value.length) + "</strong>";
               b.addEventListener("click", function(e) {
                closeAllLists();

                 document.getElementById('Sbox').value=b.innerText;
                 var  frame=document.getElementById('frame1')
                 frame.src="https://www.wikipedia.org/wiki/"+b.innerText;
                 closeAllLists();

                 console.log('aaa')


            
               })
              
              option1.appendChild(b);
           }
          )
        }
         
        else {
          console.error(xhr.responseText);
        }
      }
    }
    xhr.open('GET', '/posts' + "?" + params, true);
    xhr.send();
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/

    console.log('hhhhhhhhhhhhhh')
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] ) {
        x[i].parentNode.removeChild(x[i]);
      }
    }}