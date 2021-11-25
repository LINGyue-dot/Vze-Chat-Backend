/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-10 23:25:31
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-25 20:30:35
 * @Description:
 */

import {
  BlockMessageProp,
  ConversationProp,
  MessageProp,
  P2PMessageProp,
  SendMessageProp,
} from "../websocket/type";
import { ChatRoomProp } from "./type";
import {
  addZset,
  delRedisValue,
  getRedisValue,
  getZset,
  getZsetScore,
  lRangeRedisValueAll,
  pushRedisValue,
  setRedisValue,
} from "./utils";

// 申请一个新 message_id
export const requestMessageId = async () => {
  const id = await getRedisValue("message_id");
  // @ts-ignore
  const message_id = parseInt(id);
  setRedisValue("message_id", (message_id + 1).toString());
  return message_id;
};

/*************** 离线消息 *************************/
// 获取某用户的所有离线消息
export const pullOfflineMessage = async (user_id: string) => {
  return await lRangeRedisValueAll(`offline:offline_message_${user_id}`);
};
// 添加用户的离线消息
export const pushOfflineMessage = async (
  user_id: string,
  data: MessageProp
) => {
  await pushRedisValue(`offline:offline_message_${user_id}`, data);
};
// 清空用户的离线消息
export const clearOfflineMessage = (user_id: string) => {
  delRedisValue(`offline:offline_message_${user_id}`);
};
/*************** 离线消息 *************************/

/*************** 待确认消息 *************************/

// 添加到待确认消息备份中
export const addTempMessage = async (
  data: BlockMessageProp | P2PMessageProp
) => {
  await setRedisValue(`temp:${data.message_id}`, JSON.stringify(data));
};
// 获取待确认消息备份
export const getTempMessage = async (message_id: string) => {
  return JSON.parse((await getRedisValue(`temp:${message_id}`)) || "{}");
};
// 删除待确认消息备份
export const delTempMessage = (message_id: string) => {
  delRedisValue(`temp:${message_id}`);
};
/*************** 待确认消息 *************************/

/*************** 已分配 id 的消息 *************************/
// 添加已分配 id 的消息
export const addConfirmMessage = async (data: SendMessageProp) => {
  await setRedisValue(
    `confirm:${data.from_user_id}_${data.temp_id}`,
    data.message_id
  );
};
// 获取已分配 id 的消息 的 id
export const getConfirmMessage = async (data: SendMessageProp) => {
  return await getRedisValue(`confirm:${data.from_user_id}_${data.temp_id}`);
};

/*************** 已分配 id 的消息 *************************/

/*************** 会话列表 *************************/

// 设置/添加某一会话为最高等级会话
// 时间戳作为 score
export const setEleToMaxScore = async (user_id: string, data: ChatRoomProp) => {
  const score = Date.now();
  await addZset(`conversation:chat_room_${user_id}`, score, data);
};

// 获取会话列表
export const getConversationList = async (user_id: string) => {
  return (await getZset(`conversation:chat_room_${user_id}`)).reverse();
};
/*************** 会话列表 *************************/
