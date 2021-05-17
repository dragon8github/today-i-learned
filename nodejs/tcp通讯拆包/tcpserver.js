let net = require('net')
let { read_pkg_size } = require('./netpkg')

let pkg = null

let server = net.createServer(function (client_sock) {
    console.log(`「client comming」 ${client_sock.remoteAddress}:${client_sock.remotePort}`)

    client_sock.on('data', function (data) {
        // 「初始化」或者「合并迭代」
        pkg = pkg ? Buffer.concat([pkg, data], pkg.length + data.length) : data

        let offset = 0
        let pkg_size = read_pkg_size(pkg, offset)
        if (pkg_size === 0) {
            return
        }

        console.log(pkg.length, offset, pkg_size)

        while (pkg.length >= offset + pkg_size) {
            // 创建一个空 buffer
            let content = Buffer.allocUnsafe(pkg_size - 2)
            
            // 从 Pkg 中抽取数据赋值给 content
            pkg.copy(content, 0, offset + 2, offset + pkg_size)

            // 接受到包信息
            console.log('接受到包信息：', content, content.toString('utf8')) 

            offset += pkg_size

            // 包处理完了
            if (offset >= pkg.length) {
                break
            }

            pkg_size = read_pkg_size(pkg, offset)
            if (pkg_size === 0) {
                break
            }
        }


        // 说明所有数据处理完了。
        if (offset >= pkg.length) {
            pkg = null
        } else {
            // 还没处理好，说明还存在一些「残包」等待发送过来
            let buf = Buffer.allocUnsafe(pkg.length - offset)

            // 将剩余的所有数据拷贝到新的Buffer里面
            pkg.copy(buf, 0, offset, pkg.length)

            // 储存
            pkg = buf
        }
    })

    client_sock.on('close', () => console.log('client_sock close socket'))
    client_sock.on('error', err => console.log('client_sock error', err))
})

server.on('connection', client_sock => console.log('「connection」client comming'))
server.on('listening', () => console.log('「listening」start listening...'))
server.on('error', err => console.log('「error」listen error', err))
server.listen({ port: 6666, host: '127.0.0.1', exclusive: true })
