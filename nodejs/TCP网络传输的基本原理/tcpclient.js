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
