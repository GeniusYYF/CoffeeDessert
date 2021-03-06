// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import storage from '@/storage'
import store from '@/store'
import session from "@/session"
// 自定义loading
import {
	loading
} from '@/model/loadingText'
import date from "@/model/date.js"

Vue.use(ElementUI)
Vue.use(loading);

Vue.config.productionTip = false
Vue.prototype.$storage = storage;
Vue.prototype.$session = session;
Vue.prototype.$eventHub = new Vue();
Vue.prototype.$date = date;
import axios from 'axios'
Vue.prototype.$axios = axios  // 挂载在vue实例化对象上

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})


