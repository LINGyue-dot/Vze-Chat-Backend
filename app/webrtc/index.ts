/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-01 18:09:22
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-03 18:32:18
 * @Description:
 */

const socket = require("socket.io");

module.exports = function installWebRTC(app: any) {
  socket(app, {
    // 解决跨域， v3 之后的必须显式声明
    cors: {
      origin: "*",
      method: ["GET", "POST"],
      credentials: true,
    },
  }).on("connection", (sock: any) => {
    console.log(sock);
    console.log("-----------");
  });
};
