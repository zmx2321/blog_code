<template>
  <div class="header" :style="{ height: settingStore.getHeaderHeight + 'px' }" flex="main:justify cross:center">
    <div class="left" flex="main:justify cross:center">
      <AppLogo></AppLogo>
      <SvgIcon
        name="collapse-menu"
        color="#333333"
        class="ft20 pointer animate ml20"
        :class="settingStore.getIsCollapseMenu && 'turn-rotate'"
        @click="collapseMenu"></SvgIcon>
      <!-- 
      <el-icon class="mr24 pointer ml24" size="18" v-if="settingStore.showSearch" @click="RefSearchDialog.show()">
        <Search />
      </el-icon> -->
    </div>
    <div class="right">
      <el-icon class="mr24 pointer" size="18" v-if="settingStore.showFullScreen" @click="fullScreenClick">
        <FullScreen />
      </el-icon>
      <el-icon class="pointer" size="18" v-if="settingStore.showTheme" @click="editThemeClick">
        <Brush />
      </el-icon>
    </div>

    <SearchDialog ref="RefSearchDialog" />
    <!-- 主题修改抽屉 -->
    <EditThemeDrawer ref="RefEditTheme"></EditThemeDrawer>
  </div>
</template>
<script setup>
import { ref, toRefs, reactive, nextTick, watch } from 'vue'
import AppLogo from '../app-logo/index.vue'
import SearchDialog from '@/layout/components/SearchDialog.vue'
import { useSettingsStore } from '@/store/settings.js'
import EditThemeDrawer from '@/layout/components/EditThemeDrawer.vue'
const settingStore = useSettingsStore()
const RefEditTheme = ref(null)
const RefSearchDialog = ref(null)

function editThemeClick() {
  RefEditTheme.value.show()
}

// 点击打开/收起侧边菜单
function collapseMenu() {
  let _isCollapseMenu = !settingStore.getIsCollapseMenu
  settingStore.isCollapseMenu = _isCollapseMenu
}
// 点击打开/关闭全屏
function fullScreenClick() {
  settingStore.isFullScreen = !settingStore.isFullScreen
  screen()
}

const screen = () => {
  let element = document.documentElement
  if (!settingStore.isFullScreen) {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  } else {
    // 全屏
    if (element.requestFullscreen) {
      element.requestFullscreen()
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  .animate {
    transition: transform 0.2s;
  }
  .turn-rotate {
    transform: rotateY(180deg);
  }
}
</style>
