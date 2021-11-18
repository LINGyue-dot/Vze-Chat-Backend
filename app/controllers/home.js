/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-09-27 17:32:39
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-18 15:47:22
 * @Description:
 */

const Customer = require("../models/customer");
const { getConversationList, setEleToMaxScore } = require("../redis/scripts");
const Response = require("../util/response");

class Home {
	async login(ctx) {
		try {
			const user = await Customer.login(ctx.request.body.name);
			// 加入会话列表
			await setEleToMaxScore(user.user_id, { block_id: "1" });
			ctx.body = new Response(200, "", user);
			console.log(ctx.body);
		} catch (e) {
			throw e;
		}
	}

	async getContacter(ctx) {
		try {
			const contactorArr = await Customer.getContacter(
				ctx.request.query.user_id
			);
			ctx.body = new Response(200, "", contactorArr);
		} catch (e) {
			throw e;
		}
	}
	// 获取用户资料
	async getUserInformation(ctx) {
		try {
			const user = await Customer.getUserInformation(ctx.request.query.user_id);
			ctx.body = new Response(200, "", user);
		} catch (e) {
			throw e;
		}
	}
	// 获取群资料
	async getBlockInformation(ctx) {
		try {
			const block = await Customer.getBlockInformation(
				ctx.request.query.block_id
			);
			ctx.body = new Response(200, "", block);
		} catch (e) {
			throw e;
		}
	}

	// 获取会话列表
	async getConversation(ctx) {
		try {
			const chatRoomList = (
				await getConversationList(ctx.request.query.user_id)
			).map(item => JSON.parse(item));
			ctx.body = new Response(200, "", chatRoomList);
		} catch (e) {
			throw e;
		}
	}
}

module.exports = new Home();
