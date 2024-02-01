import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'virtual:svg-icons-register'

// fix: 自动导入函数式组件样式没有自动导入
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-message.css'

import 'normalize.css'

import './style.scss'

import App from '@/App.vue'
// router
import router from './router/index'
// 路由守卫
import './router/permission'
// 指令权限 按钮级别
import DirAuth from '@/directives/auth.js'
// store
const store = createPinia()
// 事件国际化-中文
import 'dayjs/locale/zh-cn'
import SvgIcon from '@/components/SvgIcon/index.vue'

const app = createApp(App)

app
	.component('SvgIcon', SvgIcon)
	.directive('auth', DirAuth)
	.use(router)
	.use(store)
	.mount('#app')
