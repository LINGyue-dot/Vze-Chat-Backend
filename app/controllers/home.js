/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-09-27 17:32:39
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-08 10:48:13
 * @Description:
 */

const Customer = require("../models/customer");
const Response = require("../util/response");

class Home {
	async login(ctx) {
		try {
			const user = await Customer.login(ctx.request.body.name);
			ctx.body = new Response(200, "", user);
		} catch (e) {
			throw e;
		}
	}

	async getContactor(ctx) {
		try {
			const contactorArr = await Customer.getContactor(
				ctx.request.query.user_id
			);
			ctx.body = new Response(200, "", contactorArr);
		} catch (e) {
			throw e;
		}
	}
}

module.exports = new Home();
