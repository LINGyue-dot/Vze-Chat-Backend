/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-07 18:18:20
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-29 13:08:52
 * @Description:
 */
const fs = require("fs");
const path = require("path");
// const __dirname = path.resolve();

module.exports = app => {
	fs.readdirSync(__dirname).forEach(file => {
		// 读取当前文件夹
		// 解决编译成 js 后问题
		if (file === "index.ts" || file === "index.js") {
			return;
		}
		const route = require(`./${file}`);
		app.use(route.routes()).use(route.allowedMethods());
	});
};
