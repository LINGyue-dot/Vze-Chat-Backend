/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-09-24 17:14:45
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-10-30 17:03:07
 * @Description: 
 */
import { WebSocket } from "ws";
import { MessageProp, MessageType, UserProp } from "./type";

const WS = require('ws');

const wss = new WS.Server({ port: 7000 });

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

  console.log('System : new Connection ');
  // @ts-ignore
  heartbeat()
  // 心跳
  function heartbeat() {
    // @ts-ignore
    if (ws.pingTimeout) {
      // @ts-ignore
      clearTimeout(ws.pingTimeout)
    }
    // @ts-ignore
    ws.pingTimeout = setTimeout(() => {
      ws.terminate()
    }, (5 + 2) * 1000);
  }


  ws.on('message', function incoming(data: string) {
    try {
      const tempData = JSON.parse(data)
      // 每收到消息就重新开始摧毁倒计时
      heartbeat()
      // 如果是客户端发送心跳包
      if ((tempData as unknown as MessageProp).type === MessageType.PING) {
        const msg: MessageProp = {
          ...tempData,
          type: MessageType.PONG,
          message: 'pong'
        }
        send(ws, msg);
      } else if ((tempData as unknown as MessageProp).type === MessageType.INIT) {
        // 广播给所有用户
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
    // console.log(ws)
    // ws?.terminate()
    console.log('close : ', ws)

  })
});
