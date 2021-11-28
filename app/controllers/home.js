/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-09-27 17:32:39
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-28 17:35:45
 * @Description:
 */

const { findContacter, findBlock } = require("../models/customer");
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
	// 获取用户联系人列表
	async getContacterList(ctx) {
		try {
			const contactorArr = await Customer.getContacter(
				ctx.request.query.user_id
			);
			ctx.body = new Response(200, "", contactorArr);
		} catch (e) {
			throw e;
		}
	}
	// 获取用户的群列表
	async getBlockList(ctx) {
		const list = await Customer.getBlock(ctx.request.query.user_id);
		ctx.body = new Response(200, "", list);
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
	// 用户名模糊搜索
	async searchContacter(ctx) {
		const list = await Customer.findContacter(ctx.request.query.user_name);
		ctx.body = new Response(200, "", list);
	}

	// 群名模糊搜索
	async searchBlock(ctx) {
		const list = await Customer.findBlock(ctx.request.query.block_name);
		ctx.body = new Response(200, "", list);
	}

	// 添加好友
	async addContacter(ctx) {
		try {
			await Customer.addUserContacter(
				ctx.request.query.user_id,
				ctx.request.query.contacter_id
			);
			ctx.body = new Response(200, "");
		} catch (e) {
			ctx.body = new Response(500, "添加失败");
			console.error(e);
		}
	}

	// 加入群
	async joinBlock(ctx) {
		try {
			await Customer.addUserContacter(
				ctx.request.query.user_id,
				ctx.request.query.block_id
			);
			ctx.body = new Response(200, "");
		} catch (e) {
			ctx.body = new Response(500, "加入失败");
			console.error(e);
		}
	}

	// 新建群
	async addNewBlock(ctx) {
		try {
			const data = await Customer.addBlock(
				ctx.request.query.user_id,
				ctx.request.query.block_name
			);
			ctx.body = new Response(200, "", data);
		} catch (e) {
			ctx.body = new Response(500, "创建失败");
			console.error(e);
		}
	}
}

module.exports = new Home();
