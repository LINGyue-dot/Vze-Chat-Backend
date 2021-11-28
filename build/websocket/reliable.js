"use strict";
/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-17 17:31:41
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-18 00:55:39
 * @Description: 可靠传输机制
 * 1. user_id + temp_id 与 message_id 的 redis Set：防止为相同消息分配不同 id
 * 2. message_id 与重传计时器 Set：如果计时器接收还没收到确认消息则继续尝试重发，如果掉线则放入 redis
 * 3. message_id 与待确认消息的 hset redis：消息备份
 * 4. user_id 与 message 的离线消息 set redis：离线消息推送
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearTempTimer = exports.addTempTimer = exports.tempMap = void 0;
var utils_1 = require("./utils");
exports.tempMap = new Map();
// 添加计时器
function addTempTimer(message, user_id) {
    exports.tempMap.set(message.message_id, function () {
        setInterval(function () {
            (0, utils_1.sendToSpecialUser)(message, user_id);
        }, 3000);
    });
}
exports.addTempTimer = addTempTimer;
// 清除计时器
function clearTempTimer(message_id) {
    if (exports.tempMap.get(message_id)) {
        clearInterval(exports.tempMap.get(message_id));
    }
    exports.tempMap.delete(message_id);
}
exports.clearTempTimer = clearTempTimer;
