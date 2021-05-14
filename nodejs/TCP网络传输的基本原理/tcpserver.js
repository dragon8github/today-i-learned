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
