/*
//This file was imprtant to seperate it from app server 
//because a problem we have in the tests:
//we say that superTest module runs the server (we don't want that)
//So our solution was to seperate the listen to diffrent file
//
*/

const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>
    console.log(`Server is running at Port ${PORT}, and waiting for requests`));

