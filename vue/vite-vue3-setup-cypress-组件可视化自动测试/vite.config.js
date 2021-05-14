import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')
const legacy = require('@vitejs/plugin-legacy')

// https://vitejs.dev/config/
export default defineConfig({
    // 公共路径
    base: '/Covid-19/',
    // 构建输出目录
    outDir: 'dist',
    // 默认端口
    port: 3000,
    // 是否自动在浏览器打开
    open: true,
    // 是否开启 https
    https: false,
    // 服务端渲染
    ssr: false,
    resolve: {
        alias: {
            '@/': '/src/',
        },
        extensions: ['.vue', '.js', '.json', '.ts', '.jsx', '.tsx', '.mjs'],
    },
    css: {
        // https://vitejs.dev/config/#css-preprocessoroptions
        preprocessorOptions: {
            scss: {
                // 注意：这里必须是 src 而不是 /src，所有组件的 @import 语法也是如此。
                additionalData: `
                    @import 'src/scss/functions.scss';
                `,
            },
        },
    },
    plugins: [vue({ jsx: true }), legacy({ targets: ['defaults', 'not IE 11'] })],
    server: {
        proxy: {
            // https://vitejs.dev/config/#server-open
            '^/api/.*': {
                target: 'https://19.104.50.124/covid-19-map/visual/',
                changeOrigin: true,
                secure: false,
                ws: true,
                rewrite: path => path.replace(/^\/api/, '/'),
            },
            '^/loginAPI/.*': {
                target: 'https://19.104.50.124/covid-19-map/',
                changeOrigin: true,
                secure: false,
                ws: true,
                rewrite: path => {
                    console.log(20210402150545, path)

                    return path.replace(/^\/loginAPI/, '/')
                },
            },
        },
    },
})
