<template>
  <el-aside class="aside"
            :class="settingStore.showPageSearch && 'z-top'"
            :style="{ width: settingStore.getAsideWidth + 'px',
            backgroundColor: settingStore.getThemeColor.bgColor,
      color: settingStore.getThemeColor.color }">
    <AppLogo></AppLogo>
    <el-scrollbar :style="{height: settingStore.getAsideMenuScrollbarHeight}">
      <Menu></Menu>
    </el-scrollbar>
  </el-aside>
</template>
<script setup>
import { ref, toRefs, reactive, computed } from 'vue'
import Menu from '../menu/index.vue'
import AppLogo from '../app-logo/index.vue'

import { useSettingsStore } from '@/store/settings.js'
const settingStore = useSettingsStore()
</script>
<style lang="scss" scoped>
.aside {
  height: 100vh;
  transition: width 0.3s;
}
</style>
