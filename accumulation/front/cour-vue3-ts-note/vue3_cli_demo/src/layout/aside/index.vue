<template>
  <el-aside
    class="aside"
    style="box-shadow: 3px 0px 10px 0px rgba(183, 183, 183, 0.52); z-index: 1"
    :class="settingsStore.showPageSearch && 'z-top'"
    :style="{
      width: settingsStore.getAsideWidth + 'px',
      backgroundColor: settingsStore.getThemeColor.bgColor,
      color: settingsStore.getThemeColor.color
    }">
    <el-scrollbar :style="{ height: settingsStore.getAsideMenuScrollbarHeight }" class="relative">
      <el-menu
        class="aside-menu"
        :collapse="settingsStore.isCollapseMenu"
        background-color="#ffffff00"
        :default-openeds="[defaultOpenSubMenu]"
        :text-color="settingsStore.getThemeColor.menuTextColor">
        <RecursionMenu :data="router.options.routes" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import AppLogo from '../app-logo/index.vue'
import RecursionMenu from '@/layout/aside/RecursionMenu.vue'
import { useSettingsStore } from '@/store/settings.js'
const router = useRouter()
const route = useRoute()

let pathInfos = route.path.split('/')
const defaultOpenSubMenu = router.options.routes.filter((item) => item.path.includes(pathInfos[1]))[0].path

const settingsStore = useSettingsStore()
</script>
<style lang="scss" scoped>
.aside {
  transition: width 0.3s;
}
</style>
