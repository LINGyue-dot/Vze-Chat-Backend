/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-09-24 17:14:45
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-15 11:10:10
 * @Description:
 */
import { WebSocket } from "ws";
import { chatBlock } from "./block";
import { confirmMessage } from "./confirm";
import { heartbeat, sendPong } from "./heartbeat";
import { chatP2P } from "./p2p";
import {
	BlockMessageProp,
	ChatType,
	MessageProp,
	MessageType,
	P2PMessageProp,
} from "./type";
import { addOnlineUser, leaveOnlineUser } from "./userMap";
import { boardcastUserContactor } from "./utils";

const WS = require("ws");

const wss = new WS.Server({ port: 7000 });

wss.on("connection", function connection(ws: WebSocket) {
	console.log("System : new Connection ");
	//
	heartbeat(ws);

	ws.on("message", function incoming(data: string) {
		const message = JSON.parse(data) as unknown as MessageProp;
		// 每收到消息就重新开始摧毁倒计时
		heartbeat(ws);

		switch (message.type) {
			case MessageType.PING:
				// 如果是客户端发送心跳包
				sendPong(ws);
				break;
			case MessageType.INIT:
				// 初始化前端传来 user_id 存储数据
				addOnlineUser(message.from_user_id, ws);
				// 新用户加入通知其他用户
				// 只广播该用户的联系人与群内成员
				// 检索出该用户的联系人并直接广播。当用户打开某个群时候，向服务端请求该群在线的成员
				boardcastUserContactor(message.from_user_id);
				break;
			case MessageType.MESSAGE:
				// 确认消息
				confirmMessage(ws, message);
				// 中转转发消息
				// p2p
				// block
				if ((message as P2PMessageProp).chat_type === ChatType.PTP) {
					chatP2P(message as P2PMessageProp);
				}
				if ((message as BlockMessageProp).chat_type === ChatType.BLOCK) {
					chatBlock(message as BlockMessageProp);
				}
				break;
			case MessageType.CLOSE:
				ws.terminate();
				leaveOnlineUser(message.from_user_id);
				break;
			default:
				break;
		}
	});

	ws.on("close", function close(ws: WebSocket) {
		// console.log(ws)
		// ws?.terminate()
		console.log("close : ", ws);
	});
});
