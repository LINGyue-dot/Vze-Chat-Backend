/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-07 17:39:13
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-11 21:37:03
 * @Description:
 */

// type ResultFn = (error: Error | null, data: any) => void;

const sql = require("./mysql");

module.exports = {
	login(user_name, result) {
		// 查找如果存在则直接返回如果不存在则新添加
		return new Promise((resolve, reject) => {
			sql.query(
				`select * from user where user_name='${user_name}'`,
				(err, data) => {
					if (err) {
						reject(err);
					}
					if (data.length) {
						resolve(data[0]);
					} else {
						sql.query(
							`insert into user(user_name) values('${user_name}')`,
							(err, data) => {
								if (err) {
									reject(err);
								}
								// 返回这条新创建的数据
								resolve({
									user_id: data.insertId,
									user_name,
									user_img: "",
								});
							}
						);
					}
				}
			);
		});
	},

	// 获取用户所有联系人
	getContacter(user_id) {
		return new Promise((resolve, reject) => {
			console.log(user_id);
			// # 获取用户的联系人，联系人 id 可能再 user_contacter.contacter 可能在 user_contacter.user_id
			sql.query(
				` select *
						from user
						where user_id in (
								select user_id
								from user_contacter
								where user_contacter.contacter_id = ${user_id}
								union
								select contacter_id
								from user_contacter
								where user_contacter.user_id = ${user_id}
						)`,
				(err, data) => {
					if (err) {
						reject(err);
					}
					resolve(data);
				}
			);
		});
	},

	// 添加 p2p 的消息
	addChatMessage(from_user_id, to_user_id, message) {
		return new Promise((resolve, reject) => {
			sql.query(
				`
					insert into user_contacter_message
					(user_id,contacter_id,message)
					values(
						${from_user_id},
						${to_user_id},
						${message}
					)
				`,
				(err, data) => {
					if (err) {
						reject(err);
					}
					resolve(data.insertId);
				}
			);
		});
	},

	// 获取特定群的用户
	getBlockMember(block_id) {
		return new Promise((resolve, reject) => {
			sql.query(
				`
				select user_id from block_user where block_id=${block_id}
			`,
				(err, data) => {
					if (err) {
						reject(err);
					}
					resolve(data);
				}
			);
		});
	},

	// TODO: 添加群消息
	addBlockMessage(user_id, at_user_id, block_id, message) {
		return new Promise((resolve, reject) => {
			sql.query(`
				insert into block_message value(
				)
			`);
		});
	},
};
