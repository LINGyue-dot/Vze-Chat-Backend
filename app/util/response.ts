/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-07 18:45:47
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-28 23:15:14
 * @Description:
 */
// @ts-nocheck
// {
//   code:200,
//   message:error,
//   data:{}
// }

class Response {
	constructor(code, message, data) {
		this.code = code;
		this.message = message;
		this.data = data;
	}
}
module.exports = Response;
