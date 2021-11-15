/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-07 17:11:17
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-15 08:57:30
 * @Description:
 */

const Router = require("koa-router");
const home = require("../controllers/home");

const router = new Router({ prefix: "/ws" });

router.post("/login", home.login);
router.get("/contactor", home.getContacter);
router.get("/conversation", home.getConversation);
router.get("/user", home.getUserInformation);
router.get("/block", home.getBlockInformation);
module.exports = router;
