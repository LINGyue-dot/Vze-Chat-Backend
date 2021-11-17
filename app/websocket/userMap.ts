/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-08 14:40:52
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-17 01:20:39
 * @Description: 用户与 ws 映射表
 */

import { WebSocket } from "ws";

//
export interface UserMapProp {
  user_id: string;
  ws_instance: WebSocket;
}

// 共享内存 相当于 store
// 将所有在线的客户端实例与 ws 映射表都存储在此
export const onlineUser: UserMapProp[] = [];

export function addOnlineUser(user_id: string, ws: WebSocket) {
  onlineUser.push({
    user_id,
    ws_instance: ws,
  });
  console.log('add online user')
  // console.log(onlineUser)
}

// 去除在线成员
export function leaveOnlineUser(user_id?: string, ws?: WebSocket) {
  let index;
  onlineUser.forEach((user, i) => {
    if (user.user_id === user_id || user.ws_instance === ws) {
      index = i;
    }
  });
  if (index) {
    onlineUser.splice(index, 1);
  }
}
