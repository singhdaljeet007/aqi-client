var express = require('express');
var path = require('path');
var app = express();
var http = require('http');
global.__base = __dirname;

app.set('port', 80);
var server = http.createServer(app);

server.listen(80);
server.timeout = 100000000;
server.on('listening', ()=>{
    var addr = server.address();
    var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    console.log('Listening on ' + bind);
});

app.use(express.static(path.join(__dirname, 'client-app/dist')))

app.get('*',async (req, res,next)=>{
    res.setHeader("Access-Allow-Control-Origin", "*");
    res.sendFile(__base+"/client-app/dist/index.html");
})

module.exports = app;