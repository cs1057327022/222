var a = require('./a.js');  // 由文件但是忘记暴露了
var fun = require('./fun');
// var b = require('./b.js'); // cannot find module xxx  包不存在

console.log(b)
console.log(a)
// console.log(a.str)
console.log(fun())