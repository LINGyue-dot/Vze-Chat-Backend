"use strict";
/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-09-24 17:09:43
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-28 23:34:22
 * @Description:
 */
var formatError = require("./util/hanler").formatError;
var koa = require("koa");
var cors = require("koa-cors");
var error = require("koa-json-error");
var bodyParser = require("koa-bodyparser");
var routing = require("./route");
var app = new koa();
app.use(bodyParser());
app.use(cors());
app.use(error(formatError));
routing(app);
require("./websocket/index");
var server = app.listen(3100, function () {
    return console.log("server start successfully in port 3100");
});
var installWebRTC = require("./webrtc");
installWebRTC(server);
