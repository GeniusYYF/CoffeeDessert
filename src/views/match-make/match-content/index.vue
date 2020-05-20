<template>
	<el-row :gutter="20" class="main">
		<el-col :span="12">
			<div class="image" :style="{background:'url('+require('@/assets/match-content/'+url)+') no-repeat 4px 5px',
			'background-size': '100% 100% ',width:'100%',heigth:'400px'}">
			</div>
			<!-- <el-image class="image" :src="require('@/assets/match-content/'+url)"></el-image> -->
		</el-col>

		<el-col :span="12">
			<div class="text">
				<h3>{{title}}</h3>
				<p>{{text}}</p>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: '',
		props: ['title', 'text', 'url'],
		data() {
			return {
				baseImgUrl: "@/assets/match-content/"
			};
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.main {
		margin-top: 20px;

		.image,
		.text {
			height: 400px;
			width: 100%;
			// display: inline-block;
		}

		.text p {
			text-align: left;
		}



	}
</style>
