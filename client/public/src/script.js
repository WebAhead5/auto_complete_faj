/* eslint-disable no-unused-vars */

const giveResults = function(str,cb){
  var params = "string=" + str;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4){
        if (xhr.status === 200){
           var data = xhr.responseText;//JSON.parse(xhr.responseText);
           console.log(data);
          // var keys = Object.keys(data);
          // let i =0;
          // for (var blogPost in data) {
          //   var postDiv         = document.createElement('div');
          //   var postText        = document.createElement('p');
          //   var thumbnail       = document.createElement('img');
          //   var postContainer   = document.getElementsByClassName('post-container')[0];

          //   thumbnail.src = "./img/logo2.png";
          //   thumbnail.className = "thumbnail";
          //   postText.innerHTML = keys[i++] + "<br><br> "+ data[blogPost];
          //   postDiv.className = "post";

          //   postDiv.appendChild(thumbnail);
          //   postDiv.appendChild(postText);
          //   postContainer.appendChild(postDiv);
          // }
        }
        else {
          console.error(xhr.responseText);
        }
      }
    }
    xhr.open('GET', '/posts' + "?" + params, true);
    xhr.send();
  }