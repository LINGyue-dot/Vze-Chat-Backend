/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-07 17:39:13
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-08 10:48:28
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
						const nowTime = Date.now();
						sql.query(
							`insert into user values(${nowTime},'${user_name}','')`,
							(err, data) => {
								if (err) {
									reject(err);
								}
								// 返回这条新创建的数据
								resolve({
									user_id: nowTime,
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
	getContactor(user_id) {
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
};
