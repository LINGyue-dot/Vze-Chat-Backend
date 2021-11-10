/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-08 14:45:11
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-08 16:15:13
 * @Description:
 */

import { WebSocket } from "ws";
import { getContacter } from "../controllers/home";
import { MessageProp, MessageType } from "./type";
import { onlineUser, UserMapProp } from "./userMap";

const Cosumer = require("../models/customer");

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
// 向群内所有用户广播
export function boardcastBlock(userList: UserMapProp[], data: MessageProp) {
  userList.forEach(obj => {
    send(obj.ws_instance, data);
  });
}

// 广播给该用户的在线联系人
export async function boardcastUserContactor(user_id: string) {
  const contactorList = await Cosumer.getContacter(user_id);
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
    from_user_id: "0",
    message: "user login",
  });
}

// 发送消息给特定用户
// 如果该用户不在线则将数据放入 redis 中

export function sendToSpecialUser(message: MessageProp) {
  let flag = false;
  onlineUser.forEach(user => {
    if (message.to_user_id === user.user_id) {
      flag = true;
      send(user.ws_instance, message);
    }
  });

  // 如果该用户不在线
  // 数据存到 redis 中
  if (!flag) {
  }
}
