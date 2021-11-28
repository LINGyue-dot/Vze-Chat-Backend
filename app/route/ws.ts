/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-07 17:11:17
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-28 17:47:04
 * @Description:
 */

const Router = require("koa-router");
const home = require("../controllers/home");

const router = new Router({ prefix: "/ws" });

router.post("/login", home.login);
router.get("/profile/contacter", home.getContacterList);
router.get("/profile/block", home.getBlockList);
router.get("/conversation", home.getConversation);
router.get("/user", home.getUserInformation);
router.get("/block", home.getBlockInformation);
router.get("/search/contacter", home.searchContacter);
router.get("/search/block", home.searchBlock);
router.get("/contacter/add", home.addContacter);
router.get("/block/join", home.joinBlock);
router.get("/block/new", home.addNewBlock);
module.exports = router;
