<template>
	<view class="video_player_wrap">
		<video :loop="true" :controls="false" :src="video.src"></video>
	</view>
</template>

<script>
	export default {
		name:"videoPlayer",
		
		props: {
			video: {
				type: Object,
				default: ()=> {}
			}
		},
		
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.video_player_wrap {
	width: 100%;
	height: 100%;
	
	video {
		width: 100%;
		height: 100%;
	}
}
</style>
