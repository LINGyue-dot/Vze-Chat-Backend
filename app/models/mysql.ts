/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-07 16:55:36
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2022-03-08 20:41:04
 * @Description:
 */
// @ts-nocheck
const mysql = require("mysql");

const connection = mysql.createPool({
	host: "175.24.185.110",
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
