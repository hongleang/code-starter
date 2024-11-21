import '@/styles/app.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import '@/config/validation'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import UIComponents from './components/ui'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(UIComponents)
app.mount('#app')
