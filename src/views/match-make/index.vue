<template>
	<el-row :gutter="10" class="main" type="flex" justify="center">
		<el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="3">
			<div class="list">
				<mm-aside></mm-aside>
			</div>
		</el-col>
		<el-col :xs="12" :sm="12" :md="14" :lg="14" :xl="15" offset="1">
			<div class="content">
				<div v-for="(item,i) in contents" :key="i" :id="'m'+i">
					<match-content :title="item.title" :text="item.text" :url="item.url"></match-content>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import MmAside from "./mm-aside/index.vue"
	import MatchContent from "./match-content/index.vue"

	export default {
		name: '',
		components: {
			MmAside,
			MatchContent
		},
		data() {
			return {
				contents: [
					{
						title: "烘烤咖啡+巧克力蛋糕",
						text: "巧克力蛋糕可谓是经典中的经典，而最有名的巧克力蛋糕非黑森林莫属。它融合了樱桃的酸、奶油的甜、巧克力的苦、樱桃酒的醇香。也有不少人感觉巧克力蛋糕太过甜腻，品尝时配以味道较浓的咖啡可谓恰到好处，如深度焙烤的烘烤咖啡。巧克力成分越多，咖啡味道也应越浓厚。",
						url: "img1.png"
					},
					{
						title: "卡布奇诺+提拉米苏",
						text: "经常喝下午茶的人都知道，提拉米苏和卡布其诺是绝佳的搭配，就如同一对完美的恋人，能将蛋糕的甜与咖啡的苦极好地融合。提拉米苏吃到嘴里香、滑、甜、腻，柔和中带有质感的变化，味道并不是一味的甜，因为有了可可粉，所以略有一点点不着边际的苦涩，这正好与带有醇香奶味的卡布奇诺相配。",
						url: "img2.png"
					},
					// {
					// 	title: "烘烤咖啡+巧克力蛋糕",
					// 	text: "",
					// 	url: "@/assets/match-content/img1.png"
					// },
					{
						title: "美式咖啡+芝士蛋糕",
						text: "芝士蛋糕总是有种独特的吸引力，会让人一直惦念着它，可到了终于吃上的时候又会觉得比较腻人。这样的蛋糕最适合搭配美式咖啡。也许不常喝咖啡的人也知道，美式苦味，表面有一层咖啡油，这样搭配可以使甜点吃起来不腻，又使咖啡中的苦味与酸味变得柔和不刺激。",
						url: "img4.png"
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.main {
		.list {
			// max-height: 80%;
			// width: 100%;
			// position: fixed;
			padding-top: 20px;
		}

		.content {
			height: 100%;
			width: 100%;
			// padding-top: 20px;
		}
	}
</style>
