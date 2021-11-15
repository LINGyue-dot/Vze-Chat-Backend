/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-15 11:03:00
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-15 11:09:46
 * @Description:
 */

import { WebSocket } from "ws";
import { MessageProp, MessageType } from "./type";
import { send } from "./utils";

// 返回确认消息
export const confirmMessage = (ws: WebSocket, tempMessage: MessageProp) => {
  send(ws, {
    ...tempMessage,
    type: MessageType.CONFIRM,
  });
};
