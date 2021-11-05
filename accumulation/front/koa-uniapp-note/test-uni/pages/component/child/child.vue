<template>
	<div>
		<video id='myvideo' src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/360e4b20-4f4b-11eb-8a36-ebb87efcf8c0.mp4"></video>
		
		<!-- #ifdef APP-PLUS -->
		<button type="default" @click="getInfo">显示子窗体</button>
		<button type="default" @click="hideInfo">隐藏子窗体</button>
		<!-- #endif -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				subNVue: uni.getSubNVueById('hello')
			}
		},
		methods: {
			getInfo() {
				console.log("显示")
				this.subNVue.show()
			},
			hideInfo() {
				console.log("隐藏")
				this.subNVue.hide()
			}
		}
	}
</script>

<style>
</style>
