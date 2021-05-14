import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { maybe } from "@/utils/utils.js"

import '@/scss/common.scss'

const app = createApp(App)

app.mixin({
    methods: {
        maybe
    }
})

app.use(router).use(store).mount('#app')
