"use strict";
var koa = require('koa');
var app = new koa();
require('./websocket');
app.listen(3100, function () { return console.log('server start successfully in port 3100'); });
