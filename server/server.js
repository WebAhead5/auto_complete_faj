const http = require('http');
const PORT = process.env.PORT || 5000;
const router = require('./src/router');


const server = http.createServer(router);

server.listen(PORT,()=>
    console.log(`Server is running at Port ${PORT}, and waiting for requests`));