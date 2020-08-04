//finally

let p = new Promise((resolve, reject) => {
    // resolve(1000);
    reject(1000);
})

Promise.prototype.finally = function(cb) {
    return p.then(data => {
        //Promise.resolve() 可以等到这个promise执行完成
        return Promise.resolve(cb()).then(() => data);
        // cb(); //finally传入的函数，无论成功或者失败都会执行
        // return data; //如果是成功走到下一个人的成功里
    }, err => {
        return Promise.resolve(cb()).then(() => {
            throw(err);
        })
    })
}

p.finally(() => { //是一个promise实例
    console.log('最终的')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 4000)
    })
}).then(data => {
    console.log(data);
})
.catch(e => {
    console.log('err', e);
})