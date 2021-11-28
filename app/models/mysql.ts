/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-07 16:55:36
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-20 18:48:43
 * @Description:
 */
// @ts-nocheck
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "120.27.242.14",
	user: "vze",
	password: "csz51628@+",
	database: "vze_db",
	charset: "utf8mb4",
});

connection.connect(function (err) {
	if (err) {
		console.log("err", err);
	}
	console.log("mysql connection success");
});

module.exports = connection;
