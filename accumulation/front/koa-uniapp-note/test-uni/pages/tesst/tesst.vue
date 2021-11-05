<template>
	<view>
		test1
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		// #ifdef MP-WEIXIN
		onLoad() {
			uni.$on('change', data=> {
				console.log(data)
			})
		},
		// #endif
		onShareAppMessage(res) {
			return {
			  title: '自定义分享标题',
			  path: '/pages/test/test?id=123'
			}
		},
	}
</script>

<style lang="scss">

</style>
