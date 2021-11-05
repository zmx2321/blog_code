<template>
	<view class="cont">
		{{ `${net}  ${lasttest}` }}
		{{ name }}1
		
		<button type="default" @click="ck">123</button>
		
		
		--------------------------------
		
		<child :name="name" @stf="stf"  />
	</view>
</template>

<script>
	import child from '../component/child/child'
	export default {
		components: {
			child
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '自定义分享标题',
		      path: '/pages/test/test?id=123'
		    }
		  },
		data() {
			return {
				firsttest: "hh",
				lasttest: "aa",
				name: "sss1"
			}
		},
		computed: {
			net() {
				console.log("jisuan")
				return this.firsttest + "1256"
			}
		},
		watch: {
			firsttest() {
				this.name = this.firsttest + this.lasttest + "123154"
				console.log("监听")
			},
			lasttest() {
				this.name = this.firsttest + this.lasttest + "123154"
			}
		},
		methods: {
			ck() {
				this.lasttest = "dd"
				// this.name = "des"
			},
			stf(val) {
				console.log("获取子组件值", val)
			}
		}
	}
</script>

<style lang="scss" scoped>
.cont {
	.color1 {
		color: $fontColor;
	}
	.color2 {
		color: $uni-border-color
	}
}
</style>
