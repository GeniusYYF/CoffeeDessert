<template>
	<el-menu :default-active="activeIndex" class="aside" router @select="handleSelect">
		<el-menu-item index="">
			<img class="header-img" src="@/assets/logo.png" alt />
		</el-menu-item>
		<el-menu-item index="home">首页</el-menu-item>
		<el-menu-item index="match-make">搭配制作</el-menu-item>
		<el-menu-item index="news">新闻文章</el-menu-item>
		<el-menu-item index="discuss">咖啡圈子</el-menu-item>
		<el-menu-item index="about">关于CD</el-menu-item>

		<el-submenu index="" class="personal">
			<template slot="title">userName</template>
			<el-menu-item index="personal">个人中心</el-menu-item>
			<el-menu-item index="regist-face" disabled>注册人脸</el-menu-item>
			<!-- <a href="https://www.ele.me" target="_blank">注册人脸</a> 	-->
			<el-menu-item index="" class="divider">
				<el-divider></el-divider>
			</el-menu-item>

			<el-menu-item index="">退出登录</el-menu-item>
		</el-submenu>

		<el-menu-item index="404">404</el-menu-item>
	</el-menu>
</template>

<script>
	export default {
		name: 'CdAside',
		data() {
			return {
				activeIndex: 'home'
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath)
			}
		}
	}
</script>

<style lang="scss" scoped>
	// $img-url: "@/assets/logo.png";
	.aside {
		.header-img {
			height: 100%;
		}
	}
</style>
