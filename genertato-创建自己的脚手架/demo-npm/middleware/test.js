function test(){
    return function(req,res,next){
        // 监听data
        req.on('data',function(data){
            console.log('test')
            // console.log(String(data))
            req.wyh = '王宇航'
            req.fields = data
            next()
        })
      
    }
}
module.exports = test