"use strict";
/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-08 14:45:01
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-08 15:48:37
 * @Description: 心跳逻辑处理
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPong = exports.heartbeat = void 0;
var type_1 = require("./type");
var userMap_1 = require("./userMap");
var utils_1 = require("./utils");
// 心跳包
// 当前端未发送 ping 包 7s 就摧毁这个连接视为连接已经被销毁
function heartbeat(ws) {
    if (!ws) {
        return;
    }
    // @ts-ignore
    if (ws.pingTimeout) {
        // @ts-ignore
        clearTimeout(ws.pingTimeout);
    }
    // @ts-ignore
    ws.pingTimeout = setTimeout(function () {
        ws.terminate();
        (0, userMap_1.leaveOnlineUser)(undefined, ws);
    }, (5 + 2) * 1000);
}
exports.heartbeat = heartbeat;
function sendPong(ws) {
    var msg = {
        type: type_1.MessageType.PONG,
        message: "pong",
        from_user_id: "0",
    };
    (0, utils_1.send)(ws, msg);
}
exports.sendPong = sendPong;
