<template>
	<el-container>
		<!-- <el-aside>
			<cd-aside ref="aside"></cd-aside>
		</el-aside> -->
		<el-container>

			<el-header>
				<cd-header ref="header"></cd-header>
			</el-header>

			<el-main>
				<cd-main ref="main"></cd-main>
			</el-main>
		</el-container>
	</el-container>

</template>

<script>
	// import CdAside from '@/components/cd-aside'
	import CdHeader from '@/components/cd-header'
	import CdMain from '@/components/cd-main'

	export default {
		components: {
			CdHeader,
			CdMain,
			// CdAside
		},
		watch: {
			$route: "updateRoute"
		},
		methods: {
			updateRoute() {
				this.$refs.header.activeIndex = this.$route.path.slice(1)
				console.log(this.$route);
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
