/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-14 17:25:43
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-14 20:25:22
 * @Description: redis ts type file
 */


interface ChatRoomContacterProp {
  contacter_id: string;
}
interface ChatRoomBlockProp {
  block_id: string;
}
// 会话类型
export type ChatRoomProp = (ChatRoomContacterProp | ChatRoomBlockProp)

const temp: ChatRoomProp = {
  contacter_id: "2"
}



