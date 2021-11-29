"use strict";
/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-07 18:18:20
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-07 18:58:47
 * @Description:
 */
// @ts-nocheck
var fs = require("fs");
module.exports = function (app) {
    fs.readdirSync(__dirname).forEach(function (file) {
        // 读取当前文件夹
        if (file === "index.js") {
            return;
        }
        var route = require("./" + file);
        app.use(route.routes()).use(route.allowedMethods());
    });
};
