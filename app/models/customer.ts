/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-07 17:39:13
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-29 12:39:31
 * @Description:
 */
// @ts-nocheck
// type ResultFn = (error: Error | null, data: any) => void;

const sql = require("./mysql");

module.exports = {
	login(user_name, result) {
		// 查找如果存在则直接返回如果不存在则新添加
		return new Promise((resolve, reject) => {
			console.log("user_name", user_name);
			sql.query(
				`select * from user where user_name='${user_name}'`,
				(err, data) => {
					if (err) {
						reject(err);
					}
					console.log(data);
					if (data && data.length) {
						resolve(data[0]);
					} else {
						// 新创建用户
						sql.query(
							`insert into user(user_name) values('${user_name}')`,
							async (err, data) => {
								if (err) {
									reject(err);
								}
								console.log("新建用户: ", data.insertId);
								// 每个用户都加入整个大群
								await this.addToBlock(data.insertId, 1).catch(e => reject(e));
								// 默认加 千泷为好友
								await this.addUserContacter(data.insertId, 1).catch(e =>
									reject(e)
								);

								// 返回这条新创建的数据
								resolve({
									user_id: data.insertId,
									user_name,
									user_img:
										"http://qianlon.cn/upload/2021/05/account-68d1701933c64aab96b345c98b70b080.jpeg",
								});
							}
						);
					}
				}
			);
		});
	},

	// 加入群
	addToBlock(user_id, block_id) {
		return new Promise((resolve, reject) => {
			sql.query(
				`insert into block_user values(${block_id},${user_id})`,
				(err, data) => {
					if (err) {
						reject(err);
					}
					resolve(data);
				}
			);
		});
	},

	// 获取用户信息
	getUserInformation(user_id) {
		return new Promise((resolve, reject) => {
			sql.query(`select * from user where user_id=${user_id}`, (err, data) => {
				if (err) {
					reject(err);
				}
				resolve(data);
			});
		});
	},
	// 获取群信息
	getBlockInformation(block_id) {
		return new Promise((resolve, reject) => {
			sql.query(
				`select * from block where block_id=${block_id}`,
				(err, data) => {
					if (err) {
						reject(err);
					}
					resolve(data);
				}
			);
		});
	},

	// 获取用户所有联系人
	getContacter(user_id) {
		return new Promise((resolve, reject) => {
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

	// 获取用户的所有 block
	getBlock(user_id) {
		return new Promise((resolve, reject) => {
			sql.query(
				`select *
from block, block_user where block.block_id=block_user.block_id and block_user.user_id=${user_id}`,
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
	addChatMessage(message_id, from_user_id, to_user_id, message) {
		return new Promise((resolve, reject) => {
			console.log(message);
			// 对 string 类型进行
			if (typeof message == "string" && String.prototype.replaceAll) {
				message.replaceAll(`'`, `\'`);
				message.replaceAll(`"`, `\"`);
			} else if (typeof message == "string" && String.prototype.replace) {
				message.replace(`'`, `\'`);
				message.replace(`"`, `\"`);
			}

			sql.query(
				`
					insert into user_contacter_message
					(contacter_message_id,user_id,contacter_id,message)
					values(
						${message_id},
						${from_user_id || 1},
						${to_user_id || 2},
						'${message}'
					)
				`,
				(err, data) => {
					if (err) {
						reject(err);
					}
					resolve(true);
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

	addBlockMessage(user_id, at_user_id, block_id, message) {
		return new Promise((resolve, reject) => {
			at_user_id = at_user_id ? at_user_id : null;
			sql.query(`
				insert into block_message(block_message_id,block_id,user_id,at_user_id,message) values(${message.message_id},${block_id},${user_id},${at_user_id},'${message.message}')
			`);
		});
	},

	// 查找联系人
	findContacter(user_name) {
		return new Promise((resolve, reject) => {
			sql.query(
				`select * from user where user_name like '%${user_name}%'`,
				(err, data) => {
					if (err) {
						reject(err);
					}
					resolve(data);
				}
			);
		});
	},
	// 查找群
	findBlock(block_name) {
		return new Promise((resolve, reject) => {
			sql.query(
				`select * from block where block_name like '%${block_name}%'`,
				(err, data) => {
					if (err) {
						reject(err);
					}
					resolve(data);
				}
			);
		});
	},

	// 添加好友
	addUserContacter(user_id, contacter_id) {
		return new Promise((resolve, reject) => {
			sql.query(
				`insert into user_contacter value(${user_id},${contacter_id})`,
				(err, data) => {
					if (err) {
						reject(err);
					}
					resolve(data);
				}
			);
		});
	},

	// 加群
	joinUserBlock(user_id, block_id) {
		return new Promise((resolve, reject) => {
			sql.query(
				`insert into block_user value(${block_id},${user_id})`,
				(err, data) => {
					if (err) {
						reject(err);
					}
					resolve(data);
				}
			);
		});
	},

	// 新建群
	addBlock(user_id, block_name) {
		return new Promise((resolve, reject) => {
			sql.query(
				// value(${block_name},${user_id})
				`INSERT INTO block SET ?`,
				{ block_name, owner_id: user_id },
				(err, data) => {
					if (err) {
						console.log(err);
						reject(err);
					}
					resolve({
						block_id: data.insertId,
						block_name: block_name,
						owner_id: user_id,
					});
				}
			);
		});
	},
};
