"use strict";
var WebSocket = require('ws');
var wss = new WebSocket.Server({ port: 7000 });
// 客户端数组 maxLength = 50 时间戳直接作为 id
var clientArr = [];
function send(ws, data) {
    ws.send(JSON.stringify(data));
}
function boardcast(data) {
    wss.clients.forEach(function (client) {
        send(client, data);
    });
}
wss.on('connection', function connection(ws) {
    console.log('server: connection successfully');
    console.log(wss.clients);
    ws.on('message', function incoming(data) {
        // data:{id,username,message}
        //
        console.log("server: received: %s", data.message);
        send(ws, message);
    });
});
