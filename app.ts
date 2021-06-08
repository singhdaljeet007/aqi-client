// // let express = require('express');
// var path = require('path');
// // var app = express();
// // var http = require('http');

// // app.set('port', process.env.PORT || 5000);
// // let server = http.createServer(app);

// // server.listen(process.env.PORT || 5000);
// // server.timeout = 100000000;
// // server.on('listening', ()=>{
// //     var addr = server.address();
// //     var bind = typeof addr === 'string'
// //     ? 'pipe ' + addr
// //     : 'port ' + addr.port;
// //     console.log('Listening on ' + bind);
// // });

// // app.use(express.static(path.join(__dirname, 'frontend/dist')))



// // module.exports = app;

import express from 'express';
import path from 'path'
const app = express();

app.use(express.static(path.join(__dirname, 'frontend/dist')))
app.get('*',async (req:any,res:any)=>{
    let headers= req.headers;
    res.setHeader("Access-Allow-Control-Origin", "*");
    res.sendFile(__dirname+"/frontend/dist/index.html");
})
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}`);
})