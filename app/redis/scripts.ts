/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-10 23:25:31
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-14 20:31:30
 * @Description:
 */

import { ChatRoomProp } from "./type";
import { addZset, getRedisValue, getZset, getZsetScore, setRedisValue } from "./utils"

// 获取目前的最高分数
export const getMaxScore = async (key: string) => {
  const nowMaxEle = await getZset(key)
  return await getZsetScore(key, nowMaxEle[0]);
}

// 设置/添加某一会话为最高等级会话
export const setEleToMaxScore = async (key: string, data: string | ChatRoomProp) => {
  const score = (await getMaxScore(key)) || 1;
  await addZset(key, score + 1, data);
}

export const getConversationList = async (user_id: string) => {
  return await getZset(`chat_room_${user_id}`);
}

// 申请一个新 message_id 
export const requestMessageId = async () => {
  // @ts-ignore
  const message_id = parseInt(await getRedisValue('message_id'));
  setRedisValue('message_id', (message_id + 1).toString())
  return message_id;
}
