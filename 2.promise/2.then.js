// 1）then中传递的函数判断成功和失败函数的返回结果
// 2) 判断是不是promise， 如果是promise，就采用它的状态
// 3) 如果不是promise，直接将结果传递下去即可

// let promise = require('./promise');
const Promise = require('./promise');

let p = new Promise((resolve, reject) => {
    resolve(100);
})

let promise2 = p.then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(1000)
                }, 1000)
            }));
        }, 1000)
    });
})

promise2.then(data => { //onfullfilled
    console.log('data', data);
}, err=> {
    console.log('err', err);
}).then(data => { //onrejected
    console.log(data);
}, err => {
    console.log('111', err);
})

// 2) 可选参数
let p = new Promise((resolve, reject) => {
    resolve();
})

p.then().then().then(data => {
    console.log(data);
})