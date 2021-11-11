/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-08 15:52:03
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-11 21:37:34
 * @Description: p2p 聊天
 */

import { MessageProp } from "./type";
import { sendToSpecialUser } from "./utils";

const Customer = require("../models/customer");

// p2p
// 先存入数据库
// 如果目的用户在线直接转发
// 如果不在线则放入 redis 中存储
export async function chatP2P(message: MessageProp) {
  const message_id = await Customer.addChatMessage(
    message.from_user_id,
    message.to_user_id,
    message.message
  );
  message = {
    message_id,
    ...message,
  };
  sendToSpecialUser(message);
}
