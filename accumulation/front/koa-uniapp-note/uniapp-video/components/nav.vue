<template>
	<view class="nav_wrap">
		<view class="iconfont icon-uavdsousuo icon"></view>
		<view class="middle">
			<text>推荐</text>
			<text>同城</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"nav",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.nav_wrap {
	position: fixed;
	top: 22px;
	left: 0;
	width: 100%;
	height: 35px;
	line-height: 35px;
	margin: 0 auto;
	z-index: 20;
	
	.icon {
		position: absolute;
		top: 0;
		left: 10px;
		width: 20%;
		font-size: 20px;
		color: #FFFFFF;
	}
	
	.middle {
		text-align: center;
		
		text {
			display: inline-block;
			margin-right: 13px;
			color: #FFFFFF;
		}
	}
}
</style>
