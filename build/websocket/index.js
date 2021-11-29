"use strict";
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
var scripts_1 = require("../redis/scripts");
var block_1 = require("./block");
var confirm_1 = require("./confirm");
var heartbeat_1 = require("./heartbeat");
var p2p_1 = require("./p2p");
var reliable_1 = require("./reliable");
var type_1 = require("./type");
var userMap_1 = require("./userMap");
var utils_1 = require("./utils");
var WS = require("ws");
var wss = new WS.Server({ port: 7000 });
wss.on("connection", function connection(ws) {
    console.log("System : new Connection ");
    //
    (0, heartbeat_1.heartbeat)(ws);
    ws.on("message", function incoming(data) {
        return __awaiter(this, void 0, void 0, function () {
            var message, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        message = JSON.parse(data);
                        // 每收到消息就重新开始摧毁倒计时
                        (0, heartbeat_1.heartbeat)(ws);
                        _a = message.type;
                        switch (_a) {
                            case type_1.MessageType.PING: return [3 /*break*/, 1];
                            case type_1.MessageType.INIT: return [3 /*break*/, 2];
                            case type_1.MessageType.MESSAGE: return [3 /*break*/, 3];
                            case type_1.MessageType.CLOSE: return [3 /*break*/, 5];
                            case type_1.MessageType.CONFIRM: return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        // 如果是客户端发送心跳包
                        (0, heartbeat_1.sendPong)(ws);
                        return [3 /*break*/, 8];
                    case 2:
                        // 初始化前端传来 user_id 存储数据
                        (0, userMap_1.addOnlineUser)(message.from_user_id, ws);
                        // 初始化时候传输该用户的离线消息给该用户
                        (0, utils_1.sendOfflineMessage)(message.from_user_id, ws);
                        // 新用户加入通知其他用户
                        // 只广播该用户的联系人与群内成员
                        // 检索出该用户的联系人并直接广播。当用户打开某个群时候，向服务端请求该群在线的成员
                        // boardcastUserContactor(message.from_user_id);
                        return [3 /*break*/, 8];
                    case 3: return [4 /*yield*/, (0, confirm_1.confirmMessage)(ws, message)];
                    case 4:
                        // 分配 id 以及返回 id 以及确认消息 id
                        // 注意这里的确认消息 id 利用指针在 confirmMessage 中为其添加了
                        if (_b.sent()) {
                            return [3 /*break*/, 8];
                        }
                        console.log("66---------------");
                        console.log(message);
                        console.log("66---------------");
                        // TODO 记录 temp_id 与分配的 id map 防止消息重发
                        // 中转转发消息
                        // p2p
                        // block
                        if (message.chat_type === type_1.ChatType.PTP) {
                            (0, p2p_1.chatP2P)(message);
                        }
                        else if (message.chat_type === type_1.ChatType.BLOCK) {
                            (0, block_1.chatBlock)(message);
                        }
                        return [3 /*break*/, 8];
                    case 5:
                        ws.terminate();
                        (0, userMap_1.leaveOnlineUser)(message.from_user_id);
                        return [3 /*break*/, 8];
                    case 6:
                        (0, reliable_1.clearTempTimer)(message.message_id);
                        (0, scripts_1.delTempMessage)(message.message_id);
                        return [3 /*break*/, 8];
                    case 7: return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    });
    ws.on("close", function close(ws) {
        // console.log(ws)
        // ws?.terminate()
        console.log("close : ", ws);
    });
});
