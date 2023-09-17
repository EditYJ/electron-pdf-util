import 'ant-design-vue/dist/reset.css'
import './style/index.scss'
import { createApp } from 'vue'
import App from './App.vue'

function bootstrap() {
  const app = createApp(App)
  app.mount('#app')
}

bootstrap()
