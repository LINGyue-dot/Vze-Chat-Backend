"use strict";
/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-09-27 08:34:01
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-17 00:34:52
 * @Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempMessageState = exports.ChatType = exports.MessageType = void 0;
// user room and contacter
var MessageType;
(function (MessageType) {
    // 初始化 只用户发送用
    MessageType["INIT"] = "INIT";
    // 关闭
    MessageType["CLOSE"] = "CLOSE";
    // 新用户加入 ws，用于通知全体使用，客户端使用该类型
    MessageType["SYSTEM"] = "SYSTEM";
    // 携带消息的数据报
    MessageType["MESSAGE"] = "MESSAGE";
    // 心跳包
    MessageType["PING"] = "PING";
    MessageType["PONG"] = "PONG";
    // 确认消息
    MessageType["CONFIRM"] = "CONFIRM";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
// 聊天类型
//
var ChatType;
(function (ChatType) {
    ChatType["PTP"] = "PTP";
    ChatType["BLOCK"] = "BLOCK";
})(ChatType = exports.ChatType || (exports.ChatType = {}));
var TempMessageState;
(function (TempMessageState) {
    TempMessageState["SENDING"] = "sending";
    TempMessageState["CONFIRM"] = "confirm";
    TempMessageState["FAIL"] = "fail";
})(TempMessageState = exports.TempMessageState || (exports.TempMessageState = {}));
