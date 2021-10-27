/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-09-24 17:14:45
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-10-27 19:35:09
 * @Description: 
 */
import { WebSocket } from "ws";
import { MessageProp, MessageType, UserProp } from "./type";

const WS = require('ws');

const wss = new WS.Server({ port: 7000 });

// 客户端数组 maxLength = 50 时间戳直接作为 id
const clientArr: UserProp[] = [];

const intervalArr = []

function send(ws: WebSocket, data: MessageProp) {
  ws.send(JSON.stringify(data));
}

// 广播
function boardcast(data: MessageProp) {
  wss.clients.forEach((client: WebSocket) => {
    send(client, data);
  });
}


wss.on('connection', function connection(ws: WebSocket) {

  console.log('!!! System Notice:new connection');
  // @ts-ignore
  heartbeat()
  // 心跳
  function heartbeat() {
    // @ts-ignore
    clearTimeout(ws.pingTimeout)
    // @ts-ignore
    ws.pingTimeout = setTimeout(() => {
      ws.terminate()
    }, 3000 + 1000);
  }
  // @ts-ignore
  ws._interval = setInterval(() => {
    ws.ping()
  }, 3000)

  ws.on('pong', () => {
    heartbeat()
    console.log("pong")
  })

  ws.on('message', function incoming(data: string) {
    try {
      const tempData = JSON.parse(data)
      if ((tempData as unknown as MessageProp).type === MessageType.INIT) {
        // 广播给所有用户正式接入 ws
        const other: MessageProp = {
          ...tempData,
          type: MessageType.SYSTEM,
          message: 'join'
        }
        boardcast(other)
      } else {
        boardcast(tempData)
      }

    } catch (e) {
      console.log(e)
    }
  });

  ws.on("close", function close(ws: WebSocket) {
    console.log('close')
    console.log(ws)
  })
});


// setInterval(() => {
//   wss.clients.forEach((client: WebSocket) => {
//     client.ping()
//   })
// }, 3000)
