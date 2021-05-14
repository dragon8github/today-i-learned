MD5: 任何数据，经过 MD5 加密后，会生成一串 16 字节的二进制对应的 'hex'字符串 

SHA1: 任何数据，经过 SHA1 加密后，会生成一串 20 字节的二进制对应的 'hex'字符串

Hash 值是不可逆的，不同内容 HASH 值不同，可以用来存放密码, 判断两个文件是否相同等。


```javascript
var crypto = require('crypto')

function md5(data) {
    var md5 = crypto.createHash('md5')
    md5.update(data)
    return md5.digest('hex')
}

function sha1(data) {
    var sha1 = crypto.createHash('sha1')
    sha1.update(data)
    return sha1.digest('hex')
}

var str = md5('HelloWorld!')
console.log(str)

var str = sha1('HelloWorld!')
console.log(str)
```
