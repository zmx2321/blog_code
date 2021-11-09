<template>
	<view class="video_list_wrap">
		<swiper class="swiper_wrap" :vertical="true">
			<swiper-item v-for="(item, index) in list" :key="item.id">
				<view class="swiper-item">
					<videoPlayer :video="item" />
				</view>
			</swiper-item>
			<!-- <swiper-item>
				<view class="swiper-item">
					<videoPlayer />
				</view>
			</swiper-item> -->
			<!-- <swiper-item>
				<view class="swiper-item">第二页</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">第三页</view>
			</swiper-item> -->
		</swiper>
	</view>
</template>

<script>
	import videoPlayer from './videoPlayer'
	
	export default {
		name:"videoList",
		components: {
			videoPlayer,
		},
		data() {
			return {
				list: [
					{
						id: 1,
						src: 'http://127.0.0.1:9999/video/1-1.mp4'
					},
					{
						id: 2,
						src: 'http://127.0.0.1:9999/video/1-2.mp4'
					},
					{
						id: 3,
						src: 'http://127.0.0.1:9999/video/1-3.mp4'
					},
					{
						id: 4,
						src: 'http://127.0.0.1:9999/video/1-4.mp4'
					},
					{
						id: 5,
						src: 'http://127.0.0.1:9999/video/1-5.mp4'
					},
					{
						id: 6,
						src: 'http://127.0.0.1:9999/video/1-6.mp4'
					},
					{
						id: 7,
						src: 'http://127.0.0.1:9999/video/1-7.mp4'
					},
					{
						id: 8,
						src: 'http://127.0.0.1:9999/video/1-8.mp4'
					},
					{
						id: 9,
						src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/第1讲（uni-app产品介绍）-%20DCloud官方视频教程@20181126-lite.m4v'
					},
					{
						id: 10,
						src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/360e4b20-4f4b-11eb-8a36-ebb87efcf8c0.mp4'
					},
					{
						id: 11,
						src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
					},
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
.video_list_wrap {
	width: 100%;
	height: 100vh;
	
	.swiper_wrap {
		width: 100%;
		height: 100%;
		
		.swiper-item {
			width: 100%;
			height: 100%;
			z-index: 19;
		}
	}
}
</style>
