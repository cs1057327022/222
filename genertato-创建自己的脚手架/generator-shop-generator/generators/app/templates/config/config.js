const path = require('path');
let config = {
    port:3000,
    host:'localhost',
    base:'http://localhost:3000',
    mysqlConfig:{
        connectionLimit:10,
        host:'localhost',
        port:'3306',
        user:'root',
        password:'123456',
        database:'shopapp'
    },
    upload:{
        uploadDir:path.join(__dirname,'./public/upload'),
        keepExtensions:true,
        multiples:true
    },
    tokenKey:'my_token'
}
module.exports = config