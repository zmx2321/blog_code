<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			// 隐藏tabbar
			uni.hideTabBar()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	html, body {
		width: 100%;
		height: 100%;
	}
	
	@font-face {
	  font-family: "iconfont"; /* Project id 2916664 */
	  src: url('./fontface/iconfont.woff2?t=163608') format('woff2'),
	       url('./fontface/iconfont.woff?t=1636080') format('woff'),
	       url('./fontface/iconfont.ttf?t=1636080') format('truetype');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-uavdsousuo:before {
	  content: "\e693";
	}
	
	.icon-uavdshangyiyehoutuifanhui:before {
	  content: "\e8ef";
	}
	
	.icon-uavdjiahao:before {
	  content: "\e626";
	}
</style>
