/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-07 18:18:20
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-07 18:58:47
 * @Description:
 */

const fs = require("fs");

module.exports = app => {
	fs.readdirSync(__dirname).forEach(file => {
		// 读取当前文件夹
		if (file === "index.js") {
			return;
		}
		const route = require(`./${file}`);
		app.use(route.routes()).use(route.allowedMethods());
	});
};
