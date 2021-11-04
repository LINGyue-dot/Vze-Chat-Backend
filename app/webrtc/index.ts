/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-01 18:09:22
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-04 19:02:07
 * @Description:
 */

import { SocketMessageProp } from "./type";

const { Server } = require("socket.io");

module.exports = function installWebRTC(app: any) {
	const io = new Server(app, {
		// 解决跨域， v3 之后的必须显式声明
		cors: {
			origin: "*",
			method: ["GET", "POST"],
			credentials: true,
		},
	});

	io.on("connection", (sock: any) => {
		console.log("new connection");
		sock.join("one room"); // join async ?
		const room = io.sockets.adapter.rooms.get("one room");
		console.log(room.size);
		if (room.size >= 2) {
			io.emit("room-ok");
		}
		// console.log(socket.sockets.adapter.rooms.get().size);
		// answer and offer
		sock.on("offer", (msg: SocketMessageProp) => {
			sock.broadcast.emit("offer", msg);
		});
		sock.on("answer", (msg: SocketMessageProp) => {
			sock.broadcast.emit("answer", msg);
		});
		// ice candidate
		sock.on("offer-candidate", (msg: SocketMessageProp) => {
			sock.broadcast.emit("offer-candidate", msg);
		});
		sock.on("answer-candidate", (msg: SocketMessageProp) => {
			sock.broadcast.emit("answer-candidate", msg);
		});

		sock.on("disconnecting", () => {
			console.log("socket discoonection"); // the Set contains at least the socket ID
		});

		sock.on("disconnect", () => {
			// socket.rooms.size === 0
		});
	});

	io.on("disconnection", (sock: any) => {
		console.log("socket disconnection");
	});
};
