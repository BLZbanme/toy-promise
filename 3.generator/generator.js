//generator

const { resolve } = require('path');
const { rejects } = require('assert');

//这就是一个generator函数，特点就是可以暂停
// * yield产出
//iterator迭代器

//for of 循环 必须要有iterator (Array.from 直接变成数组 [...likeArray]具有迭代功能)
// let obj = {
//     0: 1,
//     1: 2,
//     *[Symbol.iterator] () { //可迭代的方法
//         // let index = 0;
//         // //迭代器 默认就是一个对象，具备next方法和调用后返回value和done属性
//         // return {
//         //     next: () => {
//         //         return {
//         //             value: this[index],
//         //             done: this.length === index++
//         //         }
//         //     }
//         // }

//         for (let i = 0; i < this.length; i++) {
//             yield this[i];
//         }
//     }, //元编程，可以更改js的行为
//     length: 2
// }

// console.log([...obj]);
// console.log(Array.from(obj));

// function* read() {
//     yield 1;
//     yield 2;
//     yield 3;
// }

// let it = read();
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

// function* read() {
//     let a = yield 'hello';
//     console.log(a);
//     let b = yield 'world';
//     console.log(b);
// }

// let it = read();
// console.log(it.next()); //第一次next方法传递的参数是没有意义的
// console.log(it.next(1)); //上一次yield的返回值
// console.log(it.next(2));

let fs = require('fs').promises;

// fs.readFile('./name.txt', 'utf8').then(data => {
//     console.log(data);
// })

function* read() {
    try {
        let context = yield fs.readFile('./name.txt', 'utf8');
        let r = yield fs.readFile(context, 'utf8');
    }
    catch (e) {
        console.log('err', e);
    }
    // return r;
}

function co(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            let {value, done} = it.next(data);
            if (!done) {
                Promise.resolve(value).then(data => {
                    next(data);
                }, err => {
                    it.throw(err); //可以捕获generator中的异常
                    reject();
                })
            }
            else {
                resolve(data);
            }
        }

        next();  
    })
    
}

co(read()).then(data => {
    console.log(data);
}, err => {
    console.log(err);
})

// let it = read();
// //循环 循环不支持异步 递归
// let {value, done } = it.next();
// Promise.resolve(value).then(data => {
//     let {value, done} = it.next(data);
//     Promise.resolve(value).then(data => {
//         let { value, done } = it.next(data);
//         console.log(value);
//     })
// })

let fs = require('fs').promises;

// fs.readFile('./name.txt', 'utf8').then(data => {
//     console.log(data);
// })

async function read() {
    let context = await fs.readFile('./name.txt', 'utf8');
    let r = await fs.readFile(context, 'utf8');
    return r;
}
// console.log(read())

//基于generator + co
read().then(data => {
    console.log(data);
})