/**
 * 作为全局状态管理
 */
import { MessageProp, MessageType, UserProp } from "./type"

export const userArr: UserProp[] = [{ id: '1', username: 'qweqwe' }]

export const messageArr: MessageProp[] = [{ id: '1', username: 'qweqwe', type: MessageType.INIT, message: 'hello init' }]