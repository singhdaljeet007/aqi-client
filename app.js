var express = require('express');
var path = require('path');
var app = express();
var http = require('http');
global.__base = __dirname;

app.set('port', 3000);
var server = http.createServer(app);

server.listen(3000);
server.timeout = 100000000;
server.on('listening', ()=>{
    var addr = server.address();
    var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    console.log('Listening on ' + bind);
});

app.use(express.static(path.join(__dirname, 'frontend/dist')))

app.get('*',async (req, res,next)=>{
    res.setHeader("Access-Allow-Control-Origin", "*");
    res.sendFile(__base+"/frontend/dist/index.html");
})

module.exports = app;