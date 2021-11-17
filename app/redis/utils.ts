/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-09 20:46:48
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-17 18:34:28
 * @Description:
 */
import { ZMember } from "redis/dist/lib/commands/generic-transformers";
import { ConversationProp, MessageProp } from "../websocket/type";
import client from "./connection";
import { ChatRoomProp } from "./type";
// Key Value
export const getRedisValue = async (key: string) => {
  return await client.get(key);
};
// Key Value
export const setRedisValue = async (key: string, value: string) => {
  await client.set(key, value);
};
// List
export const lRangeRedisValueAll = async (key: string) => {
  return await client.LRANGE(key, 0, -1);
};
// List
export const pushRedisValue = async (key: string, data: MessageProp) => {
  await client.lPush(key, JSON.stringify(data));
};

export const delRedisValue = async (key: string) => {
  await client.del(key);
};

// 添加会话列表或者更新会话的分数
export const addZset = async (
  key: string,
  score: number,
  data: ChatRoomProp | string
) => {
  let tempDat: ZMember = {
    score,
    value: JSON.stringify(data) || "{}",
  };
  await client.zAdd(key, tempDat);
};

// 从上往下按分数获取会话列表
export const getZset = async (key: string) => {
  return await client.zRangeByScore(key, 0, Infinity);
};

export const getZsetScore = async (
  key: string,
  data: string | ChatRoomProp
) => {
  data = JSON.stringify(data);
  return await client.zScore(key, data);
};
