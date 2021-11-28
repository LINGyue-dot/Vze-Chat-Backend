"use strict";
/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-08 14:45:11
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-28 23:35:14
 * @Description:
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOfflineMessage = exports.sendToSpecialUser = exports.boardcastUserContactor = exports.boardcastBlock = exports.boardcastAll = exports.send = void 0;
var scripts_1 = require("../redis/scripts");
var reliable_1 = require("./reliable");
var type_1 = require("./type");
var userMap_1 = require("./userMap");
var Cosumer = require("../models/customer");
// 向客户端转发消息，保证可靠传输
//
function send(ws, data) {
    ws.send(JSON.stringify(data));
}
exports.send = send;
// 对客户端所有在线的用户广播即作用是共享群
function boardcastAll(data) {
    userMap_1.onlineUser.forEach(function (obj) {
        send(obj.ws_instance, data);
    });
}
exports.boardcastAll = boardcastAll;
// 群内广播
// 向群内其他用户广播
function boardcastBlock(userList, data) {
    userList.forEach(function (obj) {
        if (obj.user_id != data.from_user_id) {
            sendToSpecialUser(data, obj.user_id);
        }
    });
}
exports.boardcastBlock = boardcastBlock;
// 广播给该用户的在线联系人
function boardcastUserContactor(user_id) {
    return __awaiter(this, void 0, void 0, function () {
        var contactorList, onlineContactorList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Cosumer.getContacterList(user_id)];
                case 1:
                    contactorList = _a.sent();
                    onlineContactorList = [];
                    contactorList.forEach(function (user) {
                        for (var i = 0; i < userMap_1.onlineUser.length; i++) {
                            if (userMap_1.onlineUser[i].user_id === user.user_id) {
                                onlineContactorList.push(userMap_1.onlineUser[i]);
                                break;
                            }
                        }
                    });
                    boardcastBlock(onlineContactorList, {
                        type: type_1.MessageType.SYSTEM,
                        from_user_id: user_id,
                        message: "user login",
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.boardcastUserContactor = boardcastUserContactor;
// 发送消息给特定用户
// 如果该用户不在线则将数据放入 redis 中
// 在线则需要保证可靠传输
// 1. 将其推入 待确认消息队列中
// 2. 启动重传倒计时
function sendToSpecialUser(message, user_id) {
    var flag = false;
    userMap_1.onlineUser.forEach(function (user) {
        if (user_id == user.user_id) {
            flag = true;
            // 推入待确认消息队列中
            (0, scripts_1.addTempMessage)(message);
            // 启动重传倒计时
            (0, reliable_1.addTempTimer)(message, user_id);
            send(user.ws_instance, message);
        }
    });
    // 如果该用户不在线
    // 数据存到 redis 中
    if (!flag) {
        (0, scripts_1.pushOfflineMessage)(user_id, message);
    }
}
exports.sendToSpecialUser = sendToSpecialUser;
// 给该用户发送离线消息
// 加入待确认消息队列，启动重传倒计时
function sendOfflineMessage(user_id, ws) {
    return __awaiter(this, void 0, void 0, function () {
        var list, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, scripts_1.pullOfflineMessage)(user_id)];
                case 1:
                    list = _a.sent();
                    list.forEach(function (item) {
                        var tempMsg = JSON.parse(item);
                        (0, scripts_1.addTempMessage)(tempMsg);
                        (0, reliable_1.addTempTimer)(tempMsg, user_id);
                        send(ws, tempMsg);
                    });
                    (0, scripts_1.clearOfflineMessage)(user_id);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.sendOfflineMessage = sendOfflineMessage;
