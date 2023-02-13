<template>
  <el-aside
    class="aside"
    :class="settingStore.showPageSearch && 'z-top'"
    :style="{
      width: settingStore.getAsideWidth + 'px',
      backgroundColor: settingStore.getThemeColor.bgColor,
      color: settingStore.getThemeColor.color
    }">
    <AppLogo></AppLogo>
    <el-scrollbar>
      <!-- <Menu></Menu> -->
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{}}</p>
    </el-scrollbar>
  </el-aside>
</template>
<script setup>
import { ref, toRefs, reactive } from 'vue'
import Menu from '../menu/index.vue'
import AppLogo from '../app-logo/index.vue'

import { useSettingsStore } from '@/store/settings.js'
const settingStore = useSettingsStore()
</script>
<style lang="scss" scoped>
.aside {
  height: 100vh;
  transition: width 0.2s;
}
</style>
