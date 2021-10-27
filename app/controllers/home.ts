/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-09-27 17:32:39
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-10-26 21:41:32
 * @Description: 
 */
import Koa from 'koa'
import { User, users } from '../store'
import { messageArr, userArr } from '../websocket/data'
// 这里 es6 和 module 混用非常不优雅
class Home {

  getUserList(ctx: Koa.BaseContext) {
    //@ts-ignore
    ctx.body = {
      useList: userArr
    }
  }

  getMessageList(ctx: Koa.BaseContext) {
    //@ts-ignore
    ctx.body = {
      messageList: messageArr
    }
  }

  // 
  addUser(ctx: Koa.Context) {
    //@ts-ignore
    console.log(ctx.request.body)
    const newUser: User = {
      // @ts-ignore
      name: ctx.request.body.name,
      id: new Date().getTime()
    }
    ctx.body = {
      user: newUser
    }
    users.push(newUser)
  }
}

module.exports = new Home()