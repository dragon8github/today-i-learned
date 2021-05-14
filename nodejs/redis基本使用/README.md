## redis介绍
1. 内存数据库,同时也能够保存数据到磁盘;
2. 比其他的内存数据库有着更多的数据类型: 列表,集合,排序集合,哈希表等;
3. 主从结构: 数据可以备份到从服务器;

![](http://lee-1255983702.cos.ap-guangzhou.myqcloud.com/bwj1nrn3n.png)

安装教程：https://www.runoob.com/redis/redis-install.html

## window 安装
https://github.com/tporadowski/redis/releases

> 安装目录：`C:\Program Files\Redis`

![](http://lee-1255983702.cos.ap-guangzhou.myqcloud.com/uaibvc7pc.png)

```javascript
cd C:\Program Files\Redis

redis-server.exe redis.windows.conf
```

如果出现 `Could not create server TCP listening socket 127.0.0.1:6379: bind: 操作成功完成。`

解决方案：https://blog.csdn.net/huangxinyu_it/article/details/79804690

![](http://lee-1255983702.cos.ap-guangzhou.myqcloud.com/tiiwlizs.png)

## Linux 源码安装
http://redis.io/download

## 初始化 redis 密码

先启动 redis-server.exe, 再打开 redis-cli.exe

```python
# 设置密码
config set requirepass 123456

# 类似登录，每次操作都必须使用该命令，否则无法进行一切操作
auth 123456
```

## redis 配置介绍

```python
# 端口号
port 6379 

# 其它的机器就不能访问
bind 127.0.0.1

# 「备份策略」
# 表示如果每900秒内，有1个key发生变化（新增、修改和删除），则重写rdb文件（备份）
save 900 1
# 表示如果每300秒内，有10个key发生变化（新增、修改和删除），则重写rdb文件（备份）
save 300 10
# 表示如果每60秒内，有10000个key发生变化（新增、修改和删除），则重写rdb文件（备份）
save 60 10000

# 备份文件名
dbfilename dump.rdb

# 备份时是否需要压缩？
rdbcompression yes
```

## redis client 基本操作

```python
set name helloredis
get name
exists name
del name
```

## redis hash（常用）

技巧：可以将利用 hash 将「数据表」保存到 redis 中

譬如我想将 user 表中一个 id 为 15、username 为 zhangsan、password 为 123456 的用户存储到redis。可以用以下方式

```python
# 发现没有，我们直接以 id 作为 key 了
hset my_databasename_user_15 username zhangsan password 123456

# 获取所有字段
hgetall my_databasename_user_15

# 检测字段是否存在
hexists my_databasename_user_15 username

# 返回所有的 key
hkeys my_databasename_user_15

# 获取指定字段
hget my_databasename_user_15 password
```

## lpush/rpush 列表操作

```python
lpush my_list foo
rpush my_list bar
lrange my_list 0 100

lpop list_name
rpop list_name
lrange my_list 0 100
```

## 有序集合（常用）

技巧：通常用来做排序、「排名榜」

```python
zadd my_rank 10000 foo
zadd my_rank 5000 dog
zadd my_rank 2000 bar
zadd my_rank 3000 cat

zrange my_rank 0 10000
```

## node-redis

https://github.com/NodeRedis/node-redis

https://www.cnblogs.com/shaozhu520/p/10859276.html

```javascript
// $ npm i redis --S
const redis = require('redis')
const { promisify } = require('util')

const client = redis.createClient('6379', '127.0.0.1', { auth_pass: '123456' })

client.on('ready', res => console.log('ready'))
client.on('end', err => console.log('end'))
client.on('error', err => console.log(err))
client.on('connect', () => console.log('redis connect success!'))

// 基本使用
client.set('name', 'hello nodejs', function (err, res) {
    if (err) return console.log(err)
    console.log(res)
})

client.get('name', function (err, res) {
    if (err) return console.log(err)
    console.log(res)
})

// promises 
const getAsync = promisify(client.get).bind(client)
;(async () => {
    const name = await getAsync('name')
    console.log(20210512153636, name)
})()

```