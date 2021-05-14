1. 计算机里存放数据都是二进制的方式来存储（所有的数据最终都是二进制的方式存放的）
2. node.js 使用 Buffer 对象来存放二进制数据（buffer就是内存的意思）
3. Buffer一旦创建，内存大小不能改变，如果使用超过这个内存大小，就会报越界的错误
4. 由于 Buffer 对象占用的内存空间是不计算在 Node.js 进程内存空间限制上的，因此，我们也常常会使用 Buffer 来存储需要占用大量内存的数据

## 创建 buffer 对象常用 API

- Buffer.alloc(size[, fill[, encoding]])
- Buffer.allocUnsafe(size)
- Buffer.from(string[, encoding])

[Node.js的Buffer那些你可能不知道的用法](https://blog.hellozwh.com/?post=391)

[一篇帮你彻底弄懂NodeJs中的Buffer](https://blog.csdn.net/qq_34629352/article/details/88037778)

[Node.js Buffer模块深入理解Buffer.allocUnsafe与 Buffer.from及其字符串与Buffer之间的转换](https://blog.csdn.net/themagickeyjianan/article/details/86501369)

```javascript
// 创建一个大小为10的空buffer(这个buffer只能承载10个字节的内容)
const buf1 = Buffer.alloc(10)

// 根据内容直接创建buffer
const buf2 = Buffer.from("hello buffer")

// 获取Buffer的长度 
console.log(buf1.length)

// toJSON() 方法可以将数据进行Unicode编码并展示
console.log(buf1.toJSON()) // => { type: 'Buffer', data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] }

// toJSON() 方法可以将数据进行Unicode编码并展示
console.log(buf2.toJSON()) // => { type: 'Buffer',data: [ 104, 101, 108, 108, 111, 32, 98, 117, 102, 102, 101, 114 ] }

// 写入数据到 buffer
buf1.write("hello world")

// 解码buffer，因为 buf1 只能承载10个字节的内容，所有多处的东西会被截断
console.log(buf1.toString()) // => 'hello worl'

/////////////////////////////////
// alloc 和 allocUnsafe 的区别 //
/////////////////////////////////

// 分配给定的内存大小和初始值，如果没有指定初始值，那么这个处值为 0
var buf1 = Buffer.alloc(10, 'hello world')
console.log(buf)

// 分配给定的内存大小，无法设置初始值，而且该内存原本是什么样就是什么样。
var buf2 = Buffer.allocUnsafe(10)
console.log(buf2)
```

## 二进制

二进制在计算机问世之前就已经存在很久了。二进制的本质就是一个「计数系统」。

二进制就是逢2进一位的算法，可以参考这个视频 1:50 开始观看：https://www.bilibili.com/video/BV1Na4y1e7dY/

二进制算法如图所示，所以「8位二进制」最多可以表示 0 ~ 255的任意数。这些数字足够表示26个大小写英文字母和10个数字了。

![](https://lee-1255983702.cos.ap-guangzhou.myqcloud.com/1620977108208image.png)

但是，各种数字又对应什么信息呢？于是，先辈们又发明了对照表：ASCII 码表

![](https://lee-1255983702.cos.ap-guangzhou.myqcloud.com/1620978013432image.png)

计算机的最小单位是比特（bit），也就是二进制的「0」或「1」

一行8位的bit就是一个「字节（byte）」，例如：11111000，00000001，00000101

> 为啥「8位二进制」是高频词汇，是有历史原因的，最早的计算机cpu体系结构设计只能处理8位二进制数，后来16位，32位，到今天的64位。

- int8/Uint8 —— 1个字节的整数
- int16/Uint16 —— 2个字节的整数
- int32/Uint32 —— 4个字节的整数
- int/Uint —— 8个字节的整数
- Floor —— 4个字节的小数
- Double —— 8个字节的小数

Uint 即有符号的整数。什么是符号？就是正负。

所以 int 家族只能表示正数，而 Uint 家族可以表示正负。
