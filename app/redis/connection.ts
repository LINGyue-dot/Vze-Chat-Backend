/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-09 20:45:00
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-17 18:25:12
 * @Description: redis 连接
 * 0. 存放 message_id 变量 key 命名：`message_id` value: 当前未分配的message_id
 * 1. 用户会话列表的 redis , key 命名： `conversation:chat_room_${user_id}` value: Zset , Zset 结构 (ConversationProp) score 就是时间戳 
 * 2. 用户离线消息的 redis , key 命名：`offline:offline_message_${user_id}` value: List
 * 3. 服务端已收到消息与 message_id 对应的 redis , key 命名：`confirm:${user_id}_${temp_id}` value: message_id
 * 4. message_id 与待确认消息备份 redis , key 命名：`temp:${message_id} value: ${message}
 */

import * as Redis from "redis";
const client = Redis.createClient({
  url: "redis://:csz51628@175.24.185.110:6379/0",
});

(async () => {
  await client.connect();
  client.on("error", err => console.log(err));
})();

export default client;
