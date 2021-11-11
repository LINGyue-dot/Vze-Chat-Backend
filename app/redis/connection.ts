/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-09 20:45:00
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-11 18:04:46
 * @Description:
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
