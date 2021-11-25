/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-08 15:52:03
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-20 18:36:25
 * @Description: p2p 聊天
 */

import { requestMessageId, setEleToMaxScore } from "../redis/scripts";
import { MessageProp, P2PMessageProp } from "./type";
import { sendToSpecialUser } from "./utils";

const Customer = require("../models/customer");

// p2p
// 先为该消息申请一个 id
// 先存入数据库
// 有消息来时候更新 redis 中的消息列表
export async function chatP2P(message: P2PMessageProp) {
  Customer.addChatMessage(
    message.message_id,
    message.from_user_id,
    message.to_user_id,
    message.message
  );

  // TODO 更新 redis 会话列表，添加 / 上升会话
  setEleToMaxScore(message.from_user_id, {
    contacter_id: message.to_user_id as string,
  });

  // 发送消息
  sendToSpecialUser(message, message.to_user_id);
}
