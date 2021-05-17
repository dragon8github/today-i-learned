const net = require('net')
const netpkg = require('./netpkg')

// net.Socket
const sock = net.connect({ port: 6666, host: '127.0.0.1' }, function () {
    console.log('connected to server!')
})

sock.on('connect', function () {
    console.log('connect success')

    // 模拟「粘包」
    // const buffer = netpkg.test_pkg_two_action('Hello', 'World')

    // 服务器会根据标记的「包体长度」，切割为两次处理。
    // sock.write(buffer)

    //////////////////////////////////////////////
    // say something... //
    //////////////////////////////////////////////

    // 模拟的一个大的数据包，分两次发送到客户端
    const buf_set = netpkg.test_pkg_two_slice('Hello', 'World')

    // 发送前半部分
    sock.write(buf_set[0])

    // 3秒后，发送后半部分，服务端
    setTimeout(() => sock.write(buf_set[1]), 3000)
})

// 有错误发生调用的事件
sock.on('error', e => console.log('error', e))

// socket关闭的事件
sock.on('close', () => console.log('close'))

// 对方发送了关闭数据包过来的事件
sock.on('end', () => console.log('end event'))

// 当有数据发生的时候
sock.on('data', data => console.log('data comeing', data, data.toString()))
