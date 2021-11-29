"use strict";
/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-08 14:40:52
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-17 01:20:39
 * @Description: 用户与 ws 映射表
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveOnlineUser = exports.addOnlineUser = exports.onlineUser = void 0;
// 共享内存 相当于 store
// 将所有在线的客户端实例与 ws 映射表都存储在此
exports.onlineUser = [];
function addOnlineUser(user_id, ws) {
    exports.onlineUser.push({
        user_id: user_id,
        ws_instance: ws,
    });
    console.log('add online user');
    // console.log(onlineUser)
}
exports.addOnlineUser = addOnlineUser;
// 去除在线成员
function leaveOnlineUser(user_id, ws) {
    var index;
    exports.onlineUser.forEach(function (user, i) {
        if (user.user_id === user_id || user.ws_instance === ws) {
            index = i;
        }
    });
    if (index) {
        exports.onlineUser.splice(index, 1);
    }
}
exports.leaveOnlineUser = leaveOnlineUser;
