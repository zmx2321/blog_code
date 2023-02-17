<template>
  <el-aside class="aside"
            :class="settingsStore.showPageSearch && 'z-top'"
            :style="{
      width: settingsStore.getAsideWidth + 'px',
      backgroundColor: settingsStore.getThemeColor.bgColor,
      color: settingsStore.getThemeColor.color
    }">
    <AppLogo></AppLogo>
    <el-scrollbar :style="{ height: settingsStore.getAsideMenuScrollbarHeight }">
      <el-menu class="aside-menu"
               default-active="2"
               :collapse="settingsStore.isCollapseMenu"
               background-color="#ffffff00"
               :text-color="settingsStore.getThemeColor.menuTextColor">
        <RecursionMenu :data="router.options.routes" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import AppLogo from '../app-logo/index.vue'

import RecursionMenu from "@/layout/aside/RecursionMenu.vue";
import { useSettingsStore } from '@/store/settings.js'
const router = useRouter()
const settingsStore = useSettingsStore()
</script>
<style lang="scss" scoped>
.aside {
  height: 100vh;
  transition: width 0.3s;
}
</style>
