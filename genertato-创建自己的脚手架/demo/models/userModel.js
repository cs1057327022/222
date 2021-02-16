const db = require('../config/db')

/**
 * 判断用户名是否存在
 * @param {Sting} userName 用户名 
 */
function isRegister(userName) {
    let sql = `select userName from user where userName=?;`
    return db.query(sql, [userName])   // promise对象
}

/**
 * 用将于明何密码添加到数据k
 * @param {onject} params  
 */
function registerModel(params) {
    //4 响应注册成功
    let sql = 'insert into user (userName,password) values (?,?);'
    return db.query(sql, [params.userName, params.password])
}

function loginMudel(params) {
    let {userName,password} = params
    let sql = 'select userName,password from user where userName=? and password=?;'
    return db.query(sql, [userName, password])
}

function getUserInfoModel(params){
    let {tokenData,userName} = params
    let sql = 'select * from user where userName=?;';
    return db.query(sql, [tokenData.userName])
}

module.exports = {
    isRegister,
    registerModel,
    loginMudel,
    getUserInfoModel
}