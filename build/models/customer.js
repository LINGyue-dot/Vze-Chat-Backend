"use strict";
/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-11-07 17:39:13
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-11-28 21:15:16
 * @Description:
 */
// @ts-nocheck
// type ResultFn = (error: Error | null, data: any) => void;
var sql = require("./mysql");
module.exports = {
    login: function (user_name, result) {
        var _this = this;
        // 查找如果存在则直接返回如果不存在则新添加
        return new Promise(function (resolve, reject) {
            sql.query("select * from user where user_name='" + user_name + "'", function (err, data) {
                if (err) {
                    reject(err);
                }
                console.log(data);
                if (data.length) {
                    resolve(data[0]);
                }
                else {
                    // 新创建用户
                    sql.query("insert into user(user_name) values('" + user_name + "')", function (err, data) {
                        if (err) {
                            reject(err);
                        }
                        // 每个用户都加入整个大群
                        _this.addToBlock(1, data.insertId).catch(function (e) { return reject(e); });
                        // 返回这条新创建的数据
                        resolve({
                            user_id: data.insertId,
                            user_name: user_name,
                            user_img: "http://qianlon.cn/upload/2021/11/image-c571dd25ab744ff0a954fae2cfe5b61a.png",
                        });
                    });
                }
            });
        });
    },
    // 加入群
    addToBlock: function (user_id, block_id) {
        return new Promise(function (resolve, reject) {
            sql.query("insert into block_user values(" + block_id + "," + user_id + ")", function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    },
    // 获取用户信息
    getUserInformation: function (user_id) {
        return new Promise(function (resolve, reject) {
            sql.query("select * from user where user_id=" + user_id, function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    },
    // 获取群信息
    getBlockInformation: function (block_id) {
        return new Promise(function (resolve, reject) {
            sql.query("select * from block where block_id=" + block_id, function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    },
    // 获取用户所有联系人
    getContacter: function (user_id) {
        return new Promise(function (resolve, reject) {
            // # 获取用户的联系人，联系人 id 可能再 user_contacter.contacter 可能在 user_contacter.user_id
            sql.query(" select *\n\t\t\t\t\t\tfrom user\n\t\t\t\t\t\twhere user_id in (\n\t\t\t\t\t\t\t\tselect user_id\n\t\t\t\t\t\t\t\tfrom user_contacter\n\t\t\t\t\t\t\t\twhere user_contacter.contacter_id = " + user_id + "\n\t\t\t\t\t\t\t\tunion\n\t\t\t\t\t\t\t\tselect contacter_id\n\t\t\t\t\t\t\t\tfrom user_contacter\n\t\t\t\t\t\t\t\twhere user_contacter.user_id = " + user_id + "\n\t\t\t\t\t\t)", function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    },
    // 获取用户的所有 block
    getBlock: function (user_id) {
        return new Promise(function (resolve, reject) {
            sql.query("select *\nfrom block, block_user where block.block_id=block_user.block_id and block_user.user_id=" + user_id, function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    },
    // 添加 p2p 的消息
    addChatMessage: function (message_id, from_user_id, to_user_id, message) {
        return new Promise(function (resolve, reject) {
            console.log(message);
            sql.query("\n\t\t\t\t\tinsert into user_contacter_message\n\t\t\t\t\t(contacter_message_id,user_id,contacter_id,message)\n\t\t\t\t\tvalues(\n\t\t\t\t\t\t" + message_id + ",\n\t\t\t\t\t\t" + from_user_id + ",\n\t\t\t\t\t\t" + to_user_id + ",\n\t\t\t\t\t\t" + message + "\n\t\t\t\t\t)\n\t\t\t\t", function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    },
    // 获取特定群的用户
    getBlockMember: function (block_id) {
        return new Promise(function (resolve, reject) {
            sql.query("\n\t\t\t\tselect user_id from block_user where block_id=" + block_id + "\n\t\t\t", function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    },
    addBlockMessage: function (user_id, at_user_id, block_id, message) {
        return new Promise(function (resolve, reject) {
            at_user_id = at_user_id ? at_user_id : null;
            sql.query("\n\t\t\t\tinsert into block_message(block_message_id,block_id,user_id,at_user_id,message) values(" + message.message_id + "," + block_id + "," + user_id + "," + at_user_id + ",'" + message.message + "')\n\t\t\t");
        });
    },
    // 查找联系人
    findContacter: function (user_name) {
        return new Promise(function (resolve, reject) {
            sql.query("select * from user where user_name like '%" + user_name + "%'", function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    },
    // 查找群
    findBlock: function (block_name) {
        return new Promise(function (resolve, reject) {
            sql.query("select * from block where block_name like '%" + block_name + "%'", function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    },
    // 添加好友
    addUserContacter: function (user_id, contacter_id) {
        return new Promise(function (resolve, reject) {
            sql.query("insert into user_contacter value(" + user_id + "," + contacter_id + ")", function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    },
    // 加群
    joinUserBlock: function (user_id, block_id) {
        return new Promise(function (resolve, reject) {
            sql.query("insert into block_user value(" + block_id + "," + user_id + ")", function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    },
    // 新建群
    addBlock: function (user_id, block_name) {
        return new Promise(function (resolve, reject) {
            sql.query(
            // value(${block_name},${user_id})
            "INSERT INTO block SET ?", { block_name: block_name, owner_id: user_id }, function (err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve({
                    block_id: data.insertId,
                    block_name: block_name,
                    owner_id: user_id,
                });
            });
        });
    },
};
