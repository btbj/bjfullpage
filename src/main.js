import { createApp } from 'vue'
import App from './App.vue'
import fp from './packages/index'

const app = createApp(App)
app.use(fp)
app.mount('#app')
