"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotice = exports.SystemNotice = exports.MessageNotice = void 0;
var MessageNotice = /** @class */ (function () {
    function MessageNotice() {
    }
    return MessageNotice;
}());
exports.MessageNotice = MessageNotice;
var SystemNotice = /** @class */ (function () {
    function SystemNotice(type, message) {
        this.type = type;
        this.message = message;
    }
    return SystemNotice;
}());
exports.SystemNotice = SystemNotice;
var UserNotice = /** @class */ (function () {
    function UserNotice(username, message) {
        this.username = username;
        this.message = message;
    }
    return UserNotice;
}());
exports.UserNotice = UserNotice;
