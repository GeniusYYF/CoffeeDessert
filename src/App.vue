<template>
	<div id="app">
		<router-view />

		<loading :text="loadingText" duration="1" v-show="loading" :firstBig="firstBig"></loading>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				loading: false,
				loadingText: "Load...",
				firstBig:true
			}
		},
		mounted() {
			this.$eventHub.$on("loading", loading => {
				this.loading = loading;
			});
			this.$eventHub.$on("loadingText", loadingText => {
				this.loadingText = loadingText;
			});
			this.$eventHub.$on("firstBig", firstBig => {
				this.firstBig = firstBig;
			});
		}
	}
</script>

<style lang="scss">
	html{
		height: 100%;
		background-color: rgba($color: #fffeef, $alpha: .4);
	}
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	.divider {
		height: 1px !important;

		.el-divider {
			margin: 5px 0;
		}
	}
</style>
