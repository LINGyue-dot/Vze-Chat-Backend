"use strict";
/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-10 23:25:31
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-25 20:30:35
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
exports.getConversationList = exports.setEleToMaxScore = exports.getConfirmMessage = exports.addConfirmMessage = exports.delTempMessage = exports.getTempMessage = exports.addTempMessage = exports.clearOfflineMessage = exports.pushOfflineMessage = exports.pullOfflineMessage = exports.requestMessageId = void 0;
var utils_1 = require("./utils");
// 申请一个新 message_id
var requestMessageId = function () { return __awaiter(void 0, void 0, void 0, function () {
    var id, message_id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.getRedisValue)("message_id")];
            case 1:
                id = _a.sent();
                message_id = parseInt(id);
                (0, utils_1.setRedisValue)("message_id", (message_id + 1).toString());
                return [2 /*return*/, message_id];
        }
    });
}); };
exports.requestMessageId = requestMessageId;
/*************** 离线消息 *************************/
// 获取某用户的所有离线消息
var pullOfflineMessage = function (user_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.lRangeRedisValueAll)("offline:offline_message_" + user_id)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.pullOfflineMessage = pullOfflineMessage;
// 添加用户的离线消息
var pushOfflineMessage = function (user_id, data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.pushRedisValue)("offline:offline_message_" + user_id, data)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.pushOfflineMessage = pushOfflineMessage;
// 清空用户的离线消息
var clearOfflineMessage = function (user_id) {
    (0, utils_1.delRedisValue)("offline:offline_message_" + user_id);
};
exports.clearOfflineMessage = clearOfflineMessage;
/*************** 离线消息 *************************/
/*************** 待确认消息 *************************/
// 添加到待确认消息备份中
var addTempMessage = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.setRedisValue)("temp:" + data.message_id, JSON.stringify(data))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.addTempMessage = addTempMessage;
// 获取待确认消息备份
var getTempMessage = function (message_id) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = JSON).parse;
                return [4 /*yield*/, (0, utils_1.getRedisValue)("temp:" + message_id)];
            case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()) || "{}"])];
        }
    });
}); };
exports.getTempMessage = getTempMessage;
// 删除待确认消息备份
var delTempMessage = function (message_id) {
    (0, utils_1.delRedisValue)("temp:" + message_id);
};
exports.delTempMessage = delTempMessage;
/*************** 待确认消息 *************************/
/*************** 已分配 id 的消息 *************************/
// 添加已分配 id 的消息
var addConfirmMessage = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.setRedisValue)("confirm:" + data.from_user_id + "_" + data.temp_id, data.message_id)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.addConfirmMessage = addConfirmMessage;
// 获取已分配 id 的消息 的 id
var getConfirmMessage = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.getRedisValue)("confirm:" + data.from_user_id + "_" + data.temp_id)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getConfirmMessage = getConfirmMessage;
/*************** 已分配 id 的消息 *************************/
/*************** 会话列表 *************************/
// 设置/添加某一会话为最高等级会话
// 时间戳作为 score
var setEleToMaxScore = function (user_id, data) { return __awaiter(void 0, void 0, void 0, function () {
    var score;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                score = Date.now();
                return [4 /*yield*/, (0, utils_1.addZset)("conversation:chat_room_" + user_id, score, data)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.setEleToMaxScore = setEleToMaxScore;
// 获取会话列表
var getConversationList = function (user_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.getZset)("conversation:chat_room_" + user_id)];
            case 1: return [2 /*return*/, (_a.sent()).reverse()];
        }
    });
}); };
exports.getConversationList = getConversationList;
/*************** 会话列表 *************************/
