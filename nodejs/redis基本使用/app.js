// https://github.com/NodeRedis/node-redis
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
