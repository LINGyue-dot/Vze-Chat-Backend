/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-15 11:03:00
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-18 00:35:59
 * @Description:
 */

import { WebSocket } from "ws";
import {
  addConfirmMessage,
  getConfirmMessage,
  requestMessageId,
} from "../redis/scripts";
import { MessageProp, MessageType, SendMessageProp } from "./type";
import { send } from "./utils";

// 分配 id 以及返回确认消息
// 返回 true 说明已经为这个消息分配过消息 id
// 返回 false 说明未分配消息 id ，那么分配 id 并加入 redis 中
export const confirmMessage = async (
  ws: WebSocket,
  tempMessage: SendMessageProp
) => {
  const id = await getConfirmMessage(tempMessage);
  if (id) {
    send(ws, {
      ...tempMessage,
      type: MessageType.CONFIRM,
    });
    return true;
  } else {
    const real_id = (await requestMessageId()).toString();
    (tempMessage as SendMessageProp).message_id = real_id;

    addConfirmMessage(tempMessage);

    send(ws, {
      ...tempMessage,
      type: MessageType.CONFIRM,
    });
    return false;
  }
};
