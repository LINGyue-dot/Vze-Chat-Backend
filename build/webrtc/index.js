"use strict";
/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-01 18:09:22
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-04 19:02:07
 * @Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Server = require("socket.io").Server;
module.exports = function installWebRTC(app) {
    var io = new Server(app, {
        // 解决跨域， v3 之后的必须显式声明
        cors: {
            origin: "*",
            method: ["GET", "POST"],
            credentials: true,
        },
    });
    io.on("connection", function (sock) {
        console.log("new connection");
        sock.join("one room"); // join async ?
        var room = io.sockets.adapter.rooms.get("one room");
        console.log(room.size);
        if (room.size >= 2) {
            io.emit("room-ok");
        }
        // console.log(socket.sockets.adapter.rooms.get().size);
        // answer and offer
        sock.on("offer", function (msg) {
            sock.broadcast.emit("offer", msg);
        });
        sock.on("answer", function (msg) {
            sock.broadcast.emit("answer", msg);
        });
        // ice candidate
        sock.on("offer-candidate", function (msg) {
            sock.broadcast.emit("offer-candidate", msg);
        });
        sock.on("answer-candidate", function (msg) {
            sock.broadcast.emit("answer-candidate", msg);
        });
        sock.on("disconnecting", function () {
            console.log("socket discoonection"); // the Set contains at least the socket ID
        });
        sock.on("disconnect", function () {
            // socket.rooms.size === 0
        });
    });
    io.on("disconnection", function (sock) {
        console.log("socket disconnection");
    });
};
