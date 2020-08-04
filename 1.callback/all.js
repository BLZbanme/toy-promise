let fs = require('fs');

function after(times, cb) {
    let school = {};

    return function(key, value) {
        school[key] = value;
        if (--times == 0) {
            cb(school);
        }
    }
}

let out = after(2, function (result) { //公用处理异步方式
    console.log(result);
})

// 串行 第一个走完 走第二个 并行：并发
fs.readFile('./name.txt', 'utf-8',  (err, data) => {
    out('name', data);
})

fs.readFile('./age.txt', 'utf-8',  (err, data) => {
    out('age', data);
})    

// 1) 通过回调函数来解决 after函数
// 2) 发布订阅模式 发布和订阅