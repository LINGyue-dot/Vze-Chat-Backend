/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-07 19:22:08
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-07 19:26:10
 * @Description:
 */

module.exports = {
	formatError(err) {
		return {
			code: err.status || 500,
			message: err.message,
			success: false,
			data: {},
		};
	},
};
