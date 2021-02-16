// 404 错误异常。是所有的路由 不能进入才执行404---> 所有路由的最底部
const createError = require('http-errors')
module.exports = function(){
    return function(req,res,next){
        next(createError(404))
    }
}
