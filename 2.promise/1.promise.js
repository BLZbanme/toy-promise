const fs = require('fs');

//要分段读取， 第一个人的输出是下一个人的输入

// 1) 丑回调嵌套 2) 异步错误处理问题 不能同意
// fs.readFile('./name.txt', 'utf-8', function(err, data) {
//     fs.readFile(data, 'utf-8', function(err, data) {
//         console.log(data);
//     })
// })

//变成promise
function read(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    })
}

//如果一个promise的then方法中的函数(成功和失败) 
//返回的结果是一个promise的话，会自动将这个promise执行
//并且采用它的状态，如果成功，会将成功的结果向外层的下一个then传递
read('./name.txt').then((data) => {
    // console.log(data);
    return read(data + '1');
}, err => {
    console.log(err);
}).then(data => {
    console.log(data);
}, err => {
    console.log(err);
    return 1234 //如果返回的是一个普通值，那么会将这个普通纸作为下一次成功的结果
}).then(data => {
    console.log(data);
    // 我希望在这里不要再向下走then
    return new Promise(() => {}); //终止promise，可以返回一个pending
}).then(() => {
    console.log('success')
}, () => {
    console.log('err');
})

//只有两种情况会失败，返回一个失败的promise，或者就是抛出异常
//每次执行promise的时候，都会返回一个promise