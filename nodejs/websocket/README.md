websocket 对三个东西进行了封装：
1. 握手协议
2. 收发数据
3. 关闭数据协议

> websocket 是一种通讯协议，底层是TCP socket, 基于TCP,它加入了自己的协议用来传输数据;

## 服务端
```javascript
var ws = require('ws')

// 启动基于websocket的服务器,监听我们的客户端接入进来。
var server = new ws.Server({ host: '127.0.0.1', port: 6080 })

// 监听接入进来的客户端事件
function websocket_add_listener(client_sock) {
    client_sock.on('close', () => {
        console.log('client close')
    })

    client_sock.on('error', err => {
        console.log('client error', err)
    })

    client_sock.on('message', data => {
        console.log(data)
        client_sock.send('Thank you!')
    })
}

// connection 事件, 有客户端接入进来
server.on('connection', client_sock => {
    console.log('client comming')
    websocket_add_listener(client_sock)
})

// error 事件, 表示的我们监听错误
server.on('error', err => {
    console.log('on_server_listen_error')
})

// headers 事件, 回给客户端的字符
server.on('headers', data => {
    console.log(data)
})
```

## 客户端

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WebSocket Test</title>
</head>

<body>
    <div id="app"></div>
</body>
<script>
    const ws = new WebSocket('ws://localhost:6080')

    ws.addEventListener('open', () => {
        ws.send('client ok')
    })

    ws.addEventListener('message', e => {
        console.log(e.data)
    })
</script>
</html>
```