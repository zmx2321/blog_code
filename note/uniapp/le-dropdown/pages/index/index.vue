<template>
	<view>
		<view class="header-content"></view>
		<le-dropdown
			v-model:menuList="menuList" 
			themeColor="#3cc51f"
			:duration="300"
			:isCeiling="true"
			@onConfirm="onConfirm"
			@onChange="onChange"
		></le-dropdown>
		<view class="footer-content"></view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		DropdownList
	} from "./data.js";
	const menuList = ref(DropdownList)
	const onConfirm = (data) => {
		console.log("确定事件",data)
	}
	const onChange = (data, sIndex) => {
		console.log("改变事件",data, sIndex)
	}
</script>

<style>
.header-content{
	height: 400rpx;
	background-color: bisque;
}
.footer-content{
	margin-top: 162rpx;
	width: 100%;
	height: 160vh;
	background-color: aqua;
}
</style>