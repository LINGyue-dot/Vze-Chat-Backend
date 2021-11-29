/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-08 14:45:11
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-29 13:10:49
 * @Description:
 */

import { WebSocket } from "ws";
import {
  addTempMessage,
  clearOfflineMessage,
  pullOfflineMessage,
  pushOfflineMessage,
} from "../redis/scripts";
import { pushRedisValue } from "../redis/utils";
import { addTempTimer } from "./reliable";
import {
  BlockMessageProp,
  MessageProp,
  MessageType,
  P2PMessageProp,
  SendMessageProp,
} from "./type";
import { addOnlineUser, onlineUser, UserMapProp } from "./userMap";

const Customer = require("../models/customer");

// 向客户端转发消息，保证可靠传输
//
export function send(ws: WebSocket, data: MessageProp) {
  ws.send(JSON.stringify(data));
}

// 对客户端所有在线的用户广播即作用是共享群
export function boardcastAll(data: MessageProp) {
  onlineUser.forEach(obj => {
    send(obj.ws_instance, data);
  });
}
// 群内广播
// 向群内其他用户广播
export function boardcastBlock(userList: UserMapProp[], data: MessageProp) {
  userList.forEach(obj => {
    if (obj.user_id != data.from_user_id) {
      sendToSpecialUser(data as BlockMessageProp, obj.user_id);
    }
  });
}

// 广播给该用户的在线联系人
export async function boardcastUserContactor(user_id: string) {
  const contactorList = await Customer.getContacter(user_id);
  const onlineContactorList: UserMapProp[] = [];
  contactorList.forEach((user: any) => {
    for (let i = 0; i < onlineUser.length; i++) {
      if (onlineUser[i].user_id === user.user_id) {
        onlineContactorList.push(onlineUser[i]);
        break;
      }
    }
  });

  boardcastBlock(onlineContactorList, {
    type: MessageType.SYSTEM,
    from_user_id: user_id,
    message: "user login",
  });
}

// 发送消息给特定用户
// 如果该用户不在线则将数据放入 redis 中
// 在线则需要保证可靠传输
// 1. 将其推入 待确认消息队列中
// 2. 启动重传倒计时
export function sendToSpecialUser(
  message: P2PMessageProp | BlockMessageProp,
  user_id: string
) {
  let flag = false;
  onlineUser.forEach(user => {
    if (user_id == user.user_id) {
      flag = true;
      // 推入待确认消息队列中
      addTempMessage(message);
      // 启动重传倒计时
      addTempTimer(message, user_id);
      send(user.ws_instance, message);
    }
  });

  // 如果该用户不在线
  // 数据存到 redis 中
  if (!flag) {
    pushOfflineMessage(user_id, message);
  }
}

// 给该用户发送离线消息
// 加入待确认消息队列，启动重传倒计时
export async function sendOfflineMessage(user_id: string, ws: WebSocket) {
  try {
    console.log("开始推送离线消息给用户" + user_id);
    const list = await pullOfflineMessage(user_id);
    list.forEach((item: any) => {
      console.log(item);
      const tempMsg = JSON.parse(item);
      addTempMessage(tempMsg);
      addTempTimer(tempMsg, user_id);
      send(ws, tempMsg);
    });
    clearOfflineMessage(user_id);
  } catch (e) {
    console.error(e);
  }
}
