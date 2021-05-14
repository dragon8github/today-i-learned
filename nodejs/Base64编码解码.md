## Base64 编码的作用

由于某些系统中只能使用 ASCII 字符。Base64 就是用来将非 ASCII 字符的数据转换成 ASCII 字符的一种方法。

```javascript
// Buffer输出成Base64编码
new Buffer(content).toString('base64')

// Base64编码解码
new Buffer(content, 'base64').toString()

function base64_encode(content) {
    var buf = new Buffer(content)
    return buf.toString('base64')
}

function base64_decode(base64_str) {
    var buf = new Buffer(base64_str, 'base64')
    return buf
}
```

## 将图片转换为 base64

```javascript
var fs = require('fs')

fs.readFile('avator3.png', function (err, data) {
    if (err) {
        console.log(err)
        return
    }

    // 将图片转换为 base64 编码
    var img_base64 = base64_encode(data)
    console.log(img_base64)

    // 将base64 编码重新存储为图片
    var img_data = base64_decode(img_base64)
    fs.writeFile('base64_img.png', img_data)
})
```
