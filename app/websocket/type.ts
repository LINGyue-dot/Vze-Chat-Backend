/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-09-27 08:34:01
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-09 11:59:10
 * @Description:
 */

// user room and contacter

export enum MessageType {
  // 初始化
  INIT = "INIT",
  // 关闭
  CLOSE = "CLOSE",
  // 新用户加入 ws，用于通知全体使用，客户端使用该类型
  SYSTEM = "SYSTEM",
  // 携带消息的数据报
  MESSAGE = "MESSAGE",

  // 心跳包
  PING = "PING",
  PONG = "PONG",
}

// 聊天类型
//
export enum ChatType {
  PTP = "PTP", // p2p
  BLOCK = "BLOCK", // 群
}

export interface MessageProp {
  type: MessageType;
  chat_type?: ChatType;
  // 都是 id
  at_user_id?: string | undefined;
  from_user_id: string;
  to_user_id?: string;
  group_id?: string;
  message: string | undefined | null;
}
