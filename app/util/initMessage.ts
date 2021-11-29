/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-29 11:04:38
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-29 19:50:09
 * @Description:
 */

import { pushOfflineMessage } from "../redis/scripts";
import { ChatType, MessageType } from "../websocket/type";

module.exports = {
  sendInitMessage(user_id: string) {
    console.log(user_id);
    pushOfflineMessage(user_id, {
      type: MessageType.MESSAGE,
      message_id: "2",
      // temp_id: Date.now().toString(),
      chat_type: ChatType.PTP,
      from_user_id: "1",
      to_user_id: user_id,
      send_time: Date.now(),
      message: `<p>hi</p><p>Github 链接：https://github.com/LINGyue-dot/Vze-Chat-Frontend</p><a-image class="input-img" src="http://images.qianlon.cn:5700/ef2e439b8e7eedd50aba92da9150672a.png"/><p><br/></p><a-image class="input-img" src="http://images.qianlon.cn:5700/e00bfbdcc9a49500b68259627f7c4ef0.png"/>`,
    });
  },
};
