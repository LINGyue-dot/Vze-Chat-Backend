/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-09-27 08:34:01
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-07 19:31:23
 * @Description:
 */
export enum MessageType {
  // 初始化
  INIT = "INIT",
  // 关闭
  CLOSE = "CLOSE",
  // 新用户加入或者其他通知
  SYSTEM = "SYSTEM",
  // 其他用户的消息
  USER = "USER",
  // 心跳包
  PING = "PING",
  PONG = "PONG",
}

export interface UserProp { }

export interface MessageProp extends UserProp {
  type: MessageType;
  message: string | undefined | null;
}
