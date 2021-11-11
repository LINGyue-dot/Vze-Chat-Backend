/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-09 20:46:48
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-11 18:04:16
 * @Description:
 */
import client from "./connection";

export const getRedisValue = async (key: string) => {
  return await client.get(key);
};

// 获取所有数据
export const lRangeRedisValueAll = async (key: string) => {
  return await client.LRANGE(key, 0, -1);
};

export const pushRedisValue = async (key: string, data: any) => {
  await client.lPush(key, data);
};

export const delRedisValue = async (key: string) => {
  await client.del(key);
};
