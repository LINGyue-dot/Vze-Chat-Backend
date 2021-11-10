/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-08 14:45:01
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-08 15:48:37
 * @Description: 心跳逻辑处理
 */

import { WebSocket } from "ws";
import { MessageProp, MessageType } from "./type";
import { leaveOnlineUser } from "./userMap";
import { send } from "./utils";

// 心跳包
// 当前端未发送 ping 包 7s 就摧毁这个连接视为连接已经被销毁
export function heartbeat(ws: WebSocket) {
  if (!ws) {
    return;
  }
  // @ts-ignore
  if (ws.pingTimeout) {
    // @ts-ignore
    clearTimeout(ws.pingTimeout);
  }
  // @ts-ignore
  ws.pingTimeout = setTimeout(() => {
    ws.terminate();
    leaveOnlineUser(undefined, ws);
  }, (5 + 2) * 1000);
}

export function sendPong(ws: WebSocket) {
  const msg: MessageProp = {
    type: MessageType.PONG,
    message: "pong",
    from_user_id: "0",
  };
  send(ws, msg);
}
