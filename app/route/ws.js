/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-07 17:11:17
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-08 10:35:54
 * @Description:
 */

const Router = require("koa-router");
const home = require("../controllers/home");

const router = new Router({ prefix: "/ws" });

router.post("/login", home.login);
router.get("/contactor", home.getContacter);
module.exports = router;
