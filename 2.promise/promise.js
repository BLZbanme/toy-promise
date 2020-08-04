const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

//因为所有的promise都遵循这个规范， 规定， 这里这个写法应该兼容所有的promise
const resolvePromise = (promise2, x, resolve, reject) => {
    //判断x的值和promise2 是不是同一个，如果是同一个就不要再等待了，直接出错即可
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    // promise 必会
    //判断数据类型 typeof constructor instanceof toString
    if (typeof x === 'object' &&  x !== null || typeof x === 'function') {
        try{
            let then = x.then; //取then，有可能这个then属性是通过defineProperty来定义的
            if (typeof then === 'function') { //当前有then方法，我就姑且认为他是一个promise
                then.call(x, y => {
                    resolve(y); //采用promise的成功结果将值向下传递
                }, r => {
                    reject(r); //采用失败结果向下传递
                }); //保证不用再次取then的值
            }
            else {
                resolve(x); //说明x是一个普通的对象，直接成功即可
            }
        }
        catch(e) {
            reject(e);
        }
    }
    else {
        // x是一个普通值
        resolve(x); //直接让promise2成功即可
    }
}

class Promise {

    // 1.看这个属性能否在原型上使用
    // 2.看属性是否公用
    constructor(executor) {
        this.status = PENDING; //默认是pending状态
        this.value = undefined; //成功的值
        this.reason = undefined; //失败的原因

        this.onResolvedCallbacks = []; //成功的回调的数组
        this.onRejectedCallbacks = []; //失败的回调的数组

        //成功函数
        let resolve = (value) => {
            //屏蔽调用
            if (this.status === PENDING) {
                this.value = value;
                this.status = RESOLVED;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        //失败函数
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        }
        catch (e) {
            reject(e); //如果执行时发生错误，等价于发生失败
        }
    }

    then(onfulfilled, onrejected) { //then 目前有两个参数 then方法就是异步的
        let promise2 = new Promise((resolve, reject) => { //executor 会立刻执行
            // 同步
            if (this.status === RESOLVED) {
                setTimeout(() => { //宏任务 为了保证promise2 已经new完了
                    try {
                        let x = onfulfilled(this.value);
                        // x可能是普通值，也可能是promise

                        // 判断x的值 => promise2的状态
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch(e) {
                        reject(e);
                    }
                }, 0)
            }
            if (this.status === REJECTED) {     
                setTimeout(() => { //宏任务
                    try {
                        let x = onrejected(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch(e) {
                        reject(e);
                    }
                    
                }, 0)
            }

            // 异步
            if (this.status === PENDING) {

                //如果是异步就行订阅好
                this.onResolvedCallbacks.push(() => { //重写push方法的时候
                    // todo...

                    setTimeout(() => { //宏任务
                        try {
                            let x = onfulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch(e) {
                            reject(e);
                        }
                        
                    }, 0)
                    
                });

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => { //宏任务
                        try {
                            let x = onrejected(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch(e) {
                            reject(e);
                        }
                    }, 0)
                })
            }

        })
        

        return promise2;
    }
}

module.exports = Promise;