<template>
	<uni-list class="tab_box">
		<uni-list-item class="tab_list">首页</uni-list-item>
		<uni-list-item class="tab_list">关注</uni-list-item>
		<uni-list-item class="iconfont icon-uavdjiahao tab_list jiahao"></uni-list-item>
		<uni-list-item class="tab_list">消息</uni-list-item>
		<uni-list-item class="tab_list">我</uni-list-item>
	</uni-list>
</template>

<script>
	export default {
		name:"tab",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.tab_box {
	display: flex;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 50px;
	line-height: 50px;
	
	.tab_list {
		flex: 1;
		text-align: center;
		color: #FFFFFF;
	}
	
	.jiahao {
		height: 35px;
		line-height: 35px;
		margin-top: 7px;
		border-radius: 6px;
		font-size: 15px;
		color: #000000;
		background: #FFFFFF;
	}
}
</style>
