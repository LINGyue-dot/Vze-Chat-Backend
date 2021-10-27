/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-09-24 17:09:43
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-10-26 21:05:41
 * @Description: 
 */

const koa = require('koa');
const cors = require('koa-cors')

const Router = require('koa-router')

const router = new Router({ prefix: '/ws' })

const home = require('./controllers/home')
const bodyParser = require('koa-bodyparser')

router.get('/users', home.getUserList)
router.get('/messages', home.getMessageList)

router.post('/add', home.addUser)

const app = new koa();

app.use(bodyParser())

app.use(cors()).use(router.routes()).use(router.allowedMethods())

require('./websocket');

app.listen(3100, () => console.log('server start successfully in port 3100'));
