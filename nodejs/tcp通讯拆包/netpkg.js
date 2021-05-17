const netpkg = {
    // 获取「包长度」
    read_pkg_size(buffer, offset) {
        // 因为我们规定包的前两位是储存「包长度」，其他位置才是存储「包内容」
        // 所以当一个包长度不足 2 个字节，说明这个包不具备任何内容。也就不具备任何长度。
        if (offset > buffer.length - 2) {
            return 0
        }

        // 读取「包长度」
        return buffer.readUInt16LE(offset)
    },

    // 把一个要发送的数据,封包 2个字节的长度 + 数据
    // data string 二进制的buffer
    package_data(data) {
        var buf = Buffer.allocUnsafe(2 + data.length)
        buf.writeInt16LE(2 + data.length, 0)
        buf.fill(data, 2)

        return buf
    },

    // 模拟底层 TCP 粘包的问题
    // 「粘包」 —— 长度饱和，每个位置标记包自身的大小。所以服务端拿到手后可以直接开始分割。不需要等待。
    test_pkg_two_action(content1 = 'hello', content2 = 'world') {
        // 创建一个「二合一大包」
        var buf = Buffer.allocUnsafe(2 + content1.length + 2 + content2.length)

        // 在第一个位置标记第一个包的大小
        buf.writeInt16LE(2 + content1.length, 0)
        // 填充包内容
        buf.fill(content1, 2)

        var offset = 2 + content1.length
        // 在第二个位置标记第二个包的大小
        buf.writeInt16LE(2 + content2.length, offset)
        // 填充包内容
        buf.fill(content2, offset + 2)

        return buf
    },

    // 模拟的一个大的数据包，分两次发送到客户端
    // 「分包」 —— 第一个位置标记所有包长度，所以「首个位置标记长度」会大于当前包长度。说明还有剩余的包没发送。服务端需要等待包传输完成。
    test_pkg_two_slice(content1 = 'hello', content2 = 'world') {
        var buf1 = Buffer.allocUnsafe(2 + content1.length)
        buf1.writeInt16LE(2 + content1.length + content2.length, 0)
        buf1.fill(content1, 2)

        var buf2 = Buffer.allocUnsafe(content2.length)
        buf2.fill(content2, 0)

        return [buf1, buf2]
    },
}

module.exports = netpkg
