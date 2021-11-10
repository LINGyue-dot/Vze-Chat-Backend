/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-08 15:52:08
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-08 16:34:54
 * @Description: 群聊天
 */

import { MessageProp } from "./type";

const Customer = require("../models/customer");

// 同理 p2p
// 查找该群内的所有成员
// 
export async function chatBlock(message: MessageProp) {
  const userList = await Customer.getBlockMember(message.group_id);

}
