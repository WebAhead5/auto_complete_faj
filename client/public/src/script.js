/* eslint-disable no-unused-vars */

const giveResults = function(str){
  var params = "string=" + str;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4){
        if (xhr.status === 200){
           var data = xhr.responseText;
           //Dom 
           console.log(data);
        }
        else {
          console.error(xhr.responseText);
        }
      }
    }
    xhr.open('GET', '/posts' + "?" + params, true);
    xhr.send();
  }