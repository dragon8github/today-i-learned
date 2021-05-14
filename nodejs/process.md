process 模块用来与当前进程互动,获取相关操作系统相关信息。

```javascript
console.log(process.pid)
console.log(process.version)
console.log(process.platform)
console.log(process.title)
console.log(process.argv)
console.log(process.execPath)
console.log(process.stdout)
console.log(process.stdin)
console.log(process.stderr)
console.log(process.env)
```

## process 重要方法

```javascript
// 获取当前的工作目录
progress.cwd()
// 获取当前进程运行的时间
progress.uptime()
// 设置当前的工作目录
progress.chdir()
// 下一次循环的时候调用
progress.nextTick()
```

## process 重要事件

```javascript
// 「当node退出的时候」
process.on('exit', function () {
    console.log('now node exit!!!!')
})

// 「当我们发生了一个未知的异常的时候」
// node 停止处理当前这个事件，继续等待下一个事件的处理，不会整个退出
// 服务器就不会随意的奔溃，可以把这个错误，保存起来，方便我们去查找
process.on('uncaughtException', function (err) {
    console.log('uncaughtException called ', err)
})
```
