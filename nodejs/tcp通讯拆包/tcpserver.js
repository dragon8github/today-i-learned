let net = require('net')
let netpkg = require('./netpkg')

let pkg = null
let __STEP__ = 2

let server = net.createServer(function (client_sock) {
    console.log(`「client comming」 🐤 ${client_sock.remoteAddress}:${client_sock.remotePort}`)

    client_sock.on('data', function (data) {
        
        pkg = pkg != null 
            ? Buffer.concat([pkg, data], pkg.length + data.length) 
            : data

        let offset = 0
        let pkg_len = netpkg.read_pkg_size(pkg, offset)
        if (pkg_len < 0) {
            return
        }

        while (offset + pkg_len <= pkg.length) {
            // 判断是否有完整的包
            // 根据长度信息来读取我们的数据（假设我们传过来的是文本数）
            // 2个长度信息
            let cmd_buf = Buffer.allocUnsafe(pkg_len - __STEP__) 
            pkg.copy(cmd_buf, 0, offset + __STEP__, offset + pkg_len)

            // cmd_buf：用户发过来的命令的数据
            console.log('recv Cmd: ', cmd_buf) 

            console.log(cmd_buf.toString('utf8'))

            offset += pkg_len

            // 包处理完了
            if (offset >= pkg.length) {
                break
            }

            pkg_len = netpkg.read_pkg_size(pkg, offset)
            if (pkg_len < 0) {
                break
            }
        }

        // 能处理的数据包已经处理完成了
        if (offset >= pkg.length) {
            pkg = null
        } else {
            let buf = Buffer.allocUnsafe(pkg.length - offset)

            // 将这段数据拷贝到新的Buffer里面
            pkg.copy(buf, 0, offset, pkg.length)

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
