<template>
	<div class="container" style=" margin-top:8%;">
	   <div class="panel margin-big-top">
	      <div class="text-center">
	         <br>
	         <h2 class="padding-top"> <stong>404错误！抱歉您要找的页面不存在</stong> </h2>
	         <div class=""> 
	            <div class="float-left">
	                <img src="@/assets/404-1/ds-1.gif">
	                <div class="alert"> 卧槽！页面不见了！ </div>
	            </div>
	            <div class="float-right">
	               <img src="@/assets/404-1/ds-2.png" width="260"> 
	            </div>
	          </div>
	          <div class="padding-big">
	               <router-link to="/" class="button bg-yellow">返回首页</router-link>
	               <router-link to="/" class="button">保证不打死管理员</router-link>
	          </div> 
	      </div> 
	   </div> 
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {

			};
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "css/pintuer.css";
	
	.container{

	}
</style>
