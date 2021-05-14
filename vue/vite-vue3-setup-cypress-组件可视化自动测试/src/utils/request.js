import Qs from 'qs'
import axios from 'axios'
import { dateYYYYMMDDHHmmss, logs, diffSet } from './utils.js'

const __API__ = process.env.NODE_ENV === 'development' ? '/api/' : '/fyvis/visual/'

// 请求队列
let pending = []

// 添加请求拦截器，动态设置参数
axios.interceptors.request.use(config => {
    // 获取参数详情
    const { method, params, data, noRepeat = true } = config
    
    // 获取索引
    const [url, note] = config.url.split('|')

    // 以防万一，记录一下带有注释的 url
    config.noteURL = config.url

    // 过滤url的文本注释
    config.url = url

    // 加入备注
    config.__NOTE__ = note

    // （默认开启「去重」）如果需要去重复, 则中止队列中所有相同请求地址的 xhr
    // 🔔 请注意，我这里故意使用「config.noteURL」，因为我要利用 「"|" 注释」来区分相同的 api
    noRepeat && pending.forEach(_ => _.url === config.noteURL && _.cancel('⚔️ kill repeat xhr：' + config.noteURL))

    // 配置 CancelToken
    config.cancelToken = new axios.CancelToken(cancel => {
        // 移除所有中止的请求，并且将新的请求推入缓存
        pending = [...pending.filter(_ => _.url != config.noteURL), { url: config.noteURL, cancel }]
    })

    // 返回最终配置
    return config
})

// 响应拦截器
axios.interceptors.response.use(res => {
    // 如果需要打印日志的话
    if (true) {
        // 获取请求配置
        const { method, url, params, data, status, __NOTE__ } = res.config
        // 获取参数
        const p = JSON.stringify(method === 'get' ? params : data)
        // 获取请求时间
        const date = dateYYYYMMDDHHmmss(Date.now())
        // 打印请求结果和详情
        logs(`${__NOTE__}${method.toUpperCase()}：${url}`, res.data, JSON.stringify({params: method === 'get' ? params : data , result: res.data, status }, null, '\t'))
    }

    // 成功响应之后清空队列中所有相同Url的请求
    pending = pending.filter(_ => _.url != res.config.noteURL)

    // 只返回 data 即可
    return res.data
}, error => {
    // 可以输出：error.response
    return Promise.reject(error)
})

export const GET = (url = '', params = {}, config = {}) => axios({ method: 'GET', url: __API__ + url, params, ...config })

export const POST = (url = '', data = {}, config = {}) => axios({ method: 'POST', url: __API__ + url, data, ...config })

export const FORM_POST = (url = '', data = {}, config = {}) => axios({ method: 'POST', url: __API__ + url, data: Qs.stringify(data), headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}, ...config })

export const SET = diffSet