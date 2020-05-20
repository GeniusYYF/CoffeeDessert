<template>
	<div class="main">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="机构代码">
				<el-input v-model="form.code"></el-input>
			</el-form-item>
			<el-form-item label="用户名">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="form.password"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" class="login-btn" @click="submitForm()">登录</el-button>
			</el-form-item>

		</el-form>
	</div>
</template>

<script>
	import {
		postLogin
	} from '@/api/login'

	export default {
		name: '',
		data() {
			return {
				form: {
					code: "1",
					name: "yyf",
					password: "123456"
				},
				allowRun: true
			};
		},
		methods: {
			submitForm() {
				if (this.allowRun) {
					this.$eventHub.$emit("loading", true)
					this.allowRun = false
					setTimeout(() => {
						postLogin(
							this.form.code,
							this.form.name,
							this.form.password
						).then(res => {
							this.$eventHub.$emit("loadingText", "登录成功")
							this.$eventHub.$emit("firstBig", false)
							
							let tokenInfo = res.data.data
							let path = this.$router.currentRoute.query.redirect ?
								this.$router.currentRoute.query.redirect :
								'/home'
							console.log(path)
							this.$storage.set('tokenInfo', tokenInfo)

							setTimeout(() => {
								this.$eventHub.$emit("loading", false)
								this.$eventHub.$emit("loadingText", "Load...")
								this.$eventHub.$emit("firstBig", true)
								this.$router.push(path)
							}, 2000)
						}).catch(error => {
							this.allowRun = true
						})
					}, 2500)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		border: 1px;
		border-style: ridge;
		box-shadow: 0 0 5px rgba(30, 30, 30, .5);
		// align-items: center;
		padding: 10% 0;
		// position: fixed;
		justify-content: center;
		display: flex;

		.login-btn {
		
		}
	}
</style>
