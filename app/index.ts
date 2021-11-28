/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-09-24 17:09:43
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-28 23:01:44
 * @Description:
 */

const { formatError } = require("./util/hanler");

const koa = require("koa");
const cors = require("koa-cors");

const error = require("koa-json-error");

const bodyParser = require("koa-bodyparser");

const routing = require("./route");

const app = new koa();

app.use(bodyParser());

app.use(cors());

app.use(error(formatError));

routing(app);

require("./websocket/index");

const server = app.listen(3100, () =>
  console.log("server start successfully in port 3100")
);

const installWebRTC = require("./webrtc");
installWebRTC(server);
