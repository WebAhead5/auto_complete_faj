const path = require('path');
const fs = require('fs');


const router = function (req,res){
    
    
    var filePath  = path.join(__dirname,"..","..","client","public", req.url === '/' ? '/index.html': req.url);
    if(req.url.indexOf('server') != -1){
        filePath  = path.join(__dirname,req.url.split('/')[3]);
    }
    console.log(filePath);
    const extname   = path.extname(filePath);
    let  contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.json':
            contentType = 'application/json';
            break;

    }

    fs.readFile(filePath,(err,content) => {
        if(err){
            if(err.code === 'ENOENT'){
                res.writeHead(404, {'Content-Type':'text/html'});
                res.end('<h1> File Not Found </h1>');
            }else{
                res.writeHead(500, {'Content-Type':'text/html'});
                res.end(`Server Error: ${err.code}` );
            }
        }else{
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content,'utf8');
        }
    });
}

module.exports = router;
