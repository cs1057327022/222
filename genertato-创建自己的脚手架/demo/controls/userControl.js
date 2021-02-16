const { registerModel, isRegister, loginMudel } = require('../models/userModel');
const jwt = require("jsonwebtoken");
const {getUserInfoModel} = require('../models/userModel')
/**
 * 
 * @param {Object}} req 
 * @param {Objec} res 
 */
function register(req, res) {
    //1 接收请求参数
    let params = req.fields;
    // 1.1 验证没有传请开给你
    if (typeof params.userName == 'undefined' || typeof params.password == 'undefined') {
        res.json({
            code: '0000',
            message: '入参不能为空'
        })
        return
    }
    //2 验证username password 是否合法
    let userRes = /^\w{6,12}$/.test(params.userName);
    let psdRes = /^[A-Z]\w{5,11}$/.test(params.password);
    if (!userRes || !psdRes) {
        res.json({
            code: '0001',
            message: '入参不合法'
        })
        return
    }

    //3  验证用户名是否已经存在。
    isRegister(params.userName).then(data => {
        // 3.2 将userName 看是否存在； 不存在就存入到数据库中
        if (data.length > 0) {
            res.json({
                code: '2002',
                message: '用户名已经存在'
            })
            return
        }
        // 3.1 获取用户表中所有用户信息；
        registerModel(params).then(data => {
            res.json({
                code: '2000',
                message: '注册成功'
            })
        })
    }).catch((err) => {
        res.json(err)
    })



}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
function login(req, res) {
    // 1：接收请求参数
    let params = req.fields;
    let { userName, password } = params
    // 2：验证请求参数是否有undefine
    if (!userName || !password) {
        res.json({
            code: '0000',
            message: '入参不能为空'
        })
        return
    }
    // 3：验证参数是否合法？
    if (!(/\w{6,12}$/.test(userName)) || !(/^[A-Z]\w{5,11}$/.test(password))) {
        res.json({
            code: "0001",
            message: '数据格式正确'
        })
        return
    }
    // 4：查询数据库是否存在改用户

    loginMudel(params).then((data) => {
        // data 中是否有这个用户
        if (data.length > 0) {
            // 用户存在密码相等。登陆成功；生成token
            let token = jwt.sign({
                userName,
            }, 'my_token', {
                expiresIn: 1000 * 60 * 60 ^ 2
            })
            res.json({
                code: '2000',
                message: "登陆成功",
                token,
            })
        } else {
            res.json({
                code: '2002',
                message: '用户名或者密码不存在'
            })
            return
        }
    })
}

/**
 * 
 */
function getUserInfo(req, res) {
    let { tokenCode } = req.fields;
    console.log(req.fields)
    console.log(tokenCode)
    if (tokenCode === '5001') {
        res.json({
            code: tokenCode,
            message: '无效token'
        })
        return
    }
    if (tokenCode === '5002') {
        res.json({
            code: tokenCode,
            message: "过期token"
        })
        return
    }

    getUserInfoModel(req.fields).then((data) => {
        res.json({
            code: '2000',
            message: '获取用户信息成功',
            data: data[0]
        })
    }).catch(err => {
        res.json(err)
    })


}
module.exports = {
    register,
    login,
    getUserInfo
}