/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-07 16:55:36
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-29 19:36:01
 * @Description:
 */
// @ts-nocheck
const mysql = require("mysql");

const connection = mysql.createPool({
	host: "120.27.242.14",
	user: "vze",
	password: "csz51628@+",
	database: "vze_db",
	charset: "utf8mb4",
	connectionLimit: 10,
});

// connection.getConnection(function (err) {
// 	if (err) {
// 		console.log("err", err);
// 	}
// 	console.log("mysql connection success");
// });

module.exports = connection;
