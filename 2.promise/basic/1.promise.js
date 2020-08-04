// promise的特点

// 1) 里面有三个状态 等待态（默认） 成功态 失败态 一旦成功了就不能失败，反之一样
//resolve代表的是成功， reject代表的是失败
// 2) 每个promise实例都有一个then方法
// 3) 如果new Promise的时候报错了，会变成失败态 (抛错也算失败)

let Promise = require('../promise');

let promise = new Promise((resolve, reject) => { //executor 执行器
    // throw new Error('失败');
    // console.log(1);
    // resolve('hello');
    // reject('error');
    setTimeout(() => {
        resolve('成功')
    }, 1000)
})

promise.then((data) => {
    console.log(data);
}, err => {
    console.log(err);
})

promise.then((data) => {
    console.log(data);
}, err => {
    console.log(err);
})

promise.then((data) => {
    console.log(data);
}, err => {
    console.log(err);
})

// let fs = require('fs');

// let promise = new Promise((resolve, reject) => {

// }) 