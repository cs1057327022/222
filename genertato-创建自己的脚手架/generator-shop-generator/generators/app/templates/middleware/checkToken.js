// 你认为什么接口需要验证token 呢？
// 1:参数中有token 的验证 没有token 的 next
const jwt = require('jsonwebtoken');
const { tokenKey } = require('../config/config')
function checkToken() {
    return function (req, res, next) {
        // 1: 获取接口的请求参数
        let params = req.fields

        // 2：判断token 参数是否传入  undeifned;
        if (typeof params.token === 'undefined') {
            // 2.1 如果没有token next)
            // 当前接口不需要验证token 放行
            next()
            return
        }

        // 注意：req.on('data') 只会触发一次；如果多个中间件都是用了这个req.on 那么以为第一个app.use 为主
        // req.on('data', function (data) {      
        // 2.2 有验证处理 
        jwt.verify(params.token, tokenKey, function (err, data) {
            // 2.3验证是否有效
            if (err) {
                req.fields.tokenCode = '5001';
                req.fields.tokenMsgto = '无效token'
                next()
                return
            }
            // 2.4 验证是否过期
            timer = (new Date()).getTime() / 1000;
            console.log(timer)

            if (timer > data.exp) {
                req.fields.tokenCode = '5002'
                req.fields.tokenMsg = 'token 过期'
                next()
                return
            }
            // 验证通过
            req.fields.tokenCode = '2000';
            req.fields.tokenMsg = 'token success'
            req.fields.tokenData = data
            next()
        })
        // })


    }
}
module.exports = checkToken;
// 1：中间件重来不处理业务