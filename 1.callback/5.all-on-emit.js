let fs = require('fs');

let event = {
    _arr: [],

    on(fn) { //发布和订阅之间 没有任何关系
        this._arr.push(fn);
    },
    emit() {
        this._arr.forEach(fn => fn());
    }
}

let school = {};
event.on(function() { //这个函数不会立即执行
    console.log('读取一个')
})

event.on(function() { //这个函数不会立即执行
    if (Object.keys(school).length === 2) {
        console.log(school);
    }
})



// 串行 第一个走完 走第二个 并行：并发
fs.readFile('./name.txt', 'utf-8',  (err, data) => {
    school.name = data;
    event.emit();
})

fs.readFile('./age.txt', 'utf-8',  (err, data) => {
    school.age = data;
    event.emit();
})    

// 1) 通过回调函数来解决 after函数
// 2) 发布订阅模式 发布 emit 和订阅 on 观察者模式
// 观察者 （有关系的 而且是基于发布订阅模式） 和 发布订阅有什么区别

// promise有哪些优缺点
// 优： 1)可以解决异步嵌套问题 2)可以解决多个异步并发问题
// 缺： 1）promise 基于回调的 2)promise无法终止异步

//