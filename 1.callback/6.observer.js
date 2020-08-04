// vue 特点 数据变化 更新视图，监控数据的变化，数据变化后需要更新视图

//被观察者
class Subject {
    constructor() {
        this.state = '很开心'
        this.arr = [];
    }

    attach(o) {
        this.arr.push(o);
    }

    setState(newState) {
        this.state = newState;
        this.arr.forEach(o => o.update(newState));
    }
}

// 观察者
class Observer {
    constructor(name) {
        this.name = name;
    }

    update(newState) {
        console.log(this.name + ': 小宝宝的状态是' + newState);
    }
}

let s = new Subject('小宝宝')
let o1 = new Observer('我');
let o2 = new Observer('你');

s.attach(o1);
s.attach(o2);
s.setState('不开心')
s.setState('开心')



