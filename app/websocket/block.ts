/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-08 15:52:08
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-28 19:21:54
 * @Description: 群聊天
 */

import { UserInfo } from "os";
import { setEleToMaxScore } from "../redis/scripts";
import { BlockMessageProp } from "./type";
import { boardcastBlock } from "./utils";

const Customer = require("../models/customer");

// 同理 p2p
// 查找该群内的所有成员并广播
// 上升会话
export async function chatBlock(message: BlockMessageProp) {
  Customer.addBlockMessage(
    message.from_user_id,
    message.at_user_id,
    message.block_id,
    message
  );

  //  会话提升
  setEleToMaxScore(message.from_user_id, {
    block_id: message.block_id as string,
  });

  const userList = await Customer.getBlockMember(message.block_id);
  boardcastBlock(userList, message);

  userList.forEach((user: any) => {
    setEleToMaxScore(user.user_id, {
      block_id: message.block_id,
    });
  });
}
