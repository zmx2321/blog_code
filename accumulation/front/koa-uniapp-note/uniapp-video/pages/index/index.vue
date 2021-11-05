<template>
	<view class="content">
		<nNav />
		
		<videoList />
		
		<tab />
	</view>
</template>

<script>
	import nNav from '../../components/nav'
	import tab from '../../components/tab'
	
	import videoList from '../../components/videoList'
	export default {
		components: {
			nNav,
			videoList,
			tab
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: 100%;
}
</style>
