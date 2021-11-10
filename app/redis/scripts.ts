/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-10 23:25:31
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-11 00:30:50
 * @Description:
 */

import { getRedisValue, lRangeRedisValueAll, pushRedisValue } from "./utils";

(async () => {
  let tempObj = JSON.stringify({
    name: "qwe",
  });
  await pushRedisValue("temp2", ["1", "2"]);
  console.log(await lRangeRedisValueAll("temp2"));
})();
