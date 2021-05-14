1. 游戏的服务器, 网站服务器,数据库服务等大多数都基于TCP协议来传输数据;
2. 网络通讯被抽象为 “socket”来收发数据。当连接成功后，客户端与服务器会有一个socket对，当客户端用它的socket发送数据过去的时候，服务器与这个客户端对应的socket就能收到数据，反之也是一样;
3. 不要认为TCP会丢数据包,因为一个数据包，如果没有完成TCP 确认，那么回继续重发

## TCP服务端

1. 服务器监听端口，等待客户端接入请求;
2. 客户端进来后，分配一个专门的”socket”和它数据交换;
3. 管理和维护每一个被接入进来的socket数据;
4. 所有的数据包通过包的来源的IP地址和端口转给对应的socket;
5. 如果客户端断开连接，服务器关闭这个socket（服务器也可以主动关闭socket）;

## tcpserver.js

```javascript
var net = require('net')

/**
 * 创建一个 net.Server 用来监听, 当连接进来的时候，就会调用我们的函数
 * @client_sock: 就是我们的与客户端通讯建立连接配对的socket
 */
var server = net.createServer(client_sock => {
    console.log(`「client comming」 🐤 ${client_sock.remoteAddress}:${client_sock.remotePort}`)

    // 设置你接受的格式,
    client_sock.setEncoding("utf8")

	// 转成二进制的文本编码
    // client_sock.setEncoding("hex") 

    // 客户端断开连接的时候处理,用户断线离开了
    client_sock.on('close', () => console.log('client_sock close socket'))

    // 接收到客户端的数据，调用这个函数
    client_sock.on('data', function (data) {
		// data 默认是「Buffer」对象：<Buffer 48 65 6c 6c 6f 57 6f 72 6c 64 21>
		// 如果你强制设置为 utf8, 那么底层会先转换成utf8的字符串：utf8 => HelloWorld!!!
		// 如果你强制设置为 hex => 48656c6c6f576f726c6421
        console.log(data)

        client_sock.write('goodbye!!!')

		// 主动关闭与客户端的链接
        // client_sock.end() 
    })

    client_sock.on('error', err => console.log('client_sock error', err))
})

server.on('connection', client_sock => console.log('「connection」client comming'))
server.on('listening', () => console.log('「listening」start listening...'))
server.on('error', err => console.log('「error」listen error', err))
server.on('close', () => console.log('「close」server stop listener'))

server.listen({ port: 6666, host: '127.0.0.1', exclusive: true })

// （中断进程）停止node对server的监听事件处理，那么node就没有其他的事件要处理，所以就退出了（不常用）
// server.unref() 

// 只有这个方法才可以主动触发「close」事件（不常用）
// server.close() 
```

## TCP客户端

1. 创建一个socket
2. 寻找没有使用的端口, 连接到服务器对应的IP地址和端口, 那么客户端的这个端口就作为这个通讯使用的端口，其他的不能使用；
3. 建立连接后，通过这个“socket”和服务器交换数据;
4. 客户端主动关闭socket（或者服务器主动关闭socket）

## tcpclient.js

```javascript
var net = require('net')

// net.Socket
var sock = net.connect({ port: 6666, host: '127.0.0.1' }, function () {
    console.log('connected to server!')
})

// 连接成功调用的事件
sock.on('connect', function () {
    console.log('connect success')

    // 在这里我们就可以发送数据了
	sock.write('HelloWorld!!!', 'utf8')
})

// 有错误发生调用的事件
sock.on('error', e => console.log('error', e))

// socket关闭的事件
sock.on('close', () => console.log('close'))

// 对方发送了关闭数据包过来的事件
sock.on('end', () => console.log('end event'))

// 当有数据发生的时候
sock.on('data', data => console.log('data comeing', data, data.toString()))
```