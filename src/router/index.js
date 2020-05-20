import Vue from 'vue'
import Router from 'vue-router'
import storage from '@/model/storage.js'

import CoffeeDessert from '@/coffee-dessert/index'

import Home from '@/views/home'
import MatchMake from '@/views/match-make'
import News from '@/views/news'
import Discuss from '@/views/discuss'
import About from '@/views/about'
import Personal from '@/views/personal'
import RegistFace from '@/views/regist-face'
import Login from '@/views/login'

import NotFound from '@/components/not-found/not1'

Vue.use(Router)

const routes = [{
		path: '/',
		name: 'CoffeeDessert',
		component: CoffeeDessert,
		redirect: '/home',
		children: [{
				path: '/home',
				component: Home
			},
			{
				path: '/match-make',
				component: MatchMake
			},
			{
				path: '/news',
				component: News
			},
			{
				path: '/discuss',
				component: Discuss
			},
			{
				path: '/about',
				component: About
			},
			{
				path: '/personal',
				component: Personal
			},
			{
				path: '/regist-face',
				component: RegistFace
			},
			{
				path: '/404',
				component: NotFound
			}
		]
	},
	{
		path: '/login',
		component: Login,
		meta: {
			requireAuth: false,
		}
	},
	{
		path: '*',
		redirect: '/404',
		meta: {
			requireAuth: false,
		},
	}
]


const router = new Router({
	routes: routes
})
// 设置路由守卫，在进页面之前，判断有token，才进入页面，否则返回登录页面
router.beforeEach((to, from, next) => {
	// 默认requiresAuth为false才不需要登录，其他都要
	if (to.meta.requireAuth||to.meta.requireAuth==undefined) {
		console.log("校验token")
		let tokenInfo = storage.get('tokenInfo')
		if (tokenInfo) {
			console.log("有token",tokenInfo)
			next();
		} else {
			next({
				path: "/login",
				query: {
					redirect: to.fullPath
				} // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
			});
		}
	} else {
		next(); //如果无需token,那么随它去吧
	}
});

export default router