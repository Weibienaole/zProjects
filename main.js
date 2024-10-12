import App from './App'

import TopBar from './src/components/TopBar/index.vue'

// pinia
import * as Pinia from 'pinia'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)

	// pinia
	app.use(Pinia.createPinia())

	// public components
	app.component('TopBar', TopBar)

	return {
		app,
		Pinia
	}
}
// #endif