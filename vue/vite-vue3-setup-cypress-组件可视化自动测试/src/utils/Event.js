/**
 * say something ...
 *

 let e = new Event()
 e.add("hello", (err, name) => {
     if (err) return console.error(err)
     console.log(name)
 })
 .emit('hello', null, { name: 'Lee' })
 */    
export default class Event {
    constructor(props) {
        this.map = {}
    }

    add (name, fn) {
        if (this.map[name])
            this.map[name].push(fn)
        else
            this.map[name] = [fn]
        return this
    }

    emit (name, ...args) {
        // 遍历数组中的所有函数并且执行，注入args
        this.map[name].forEach(_ => _(...args))
        // 返回prototype可以形成链式
        return this
    }
}