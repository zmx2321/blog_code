<template>
  <div class="app-logo pointer"
       style="backgroundColor: #fff"
       flex="main:center cross:center"
       :style="{ height: settingsStore.getHeaderHeight + 'px', width: settingsStore.getAsideWidth + 'px' }">
    <el-image style="width: 40px; height: 40px"
              src="https://img.tukuppt.com/photo-big/00/00/94/6152bc0ce6e5d805.jpg" />
    <!-- <h1 style="margin-left: 20px" class="ft32" :class="settingStore.getIsCollapseMenu && 'collapse-title'">{{ settingStore.title }}</h1> -->
    <h1 style="margin-left: 20px"
        class="ft32"
        v-if="showTitle">{{ settingsStore.title }}</h1>
  </div>
</template>
<script setup>
import { ref, toRefs, reactive } from 'vue'
import { useSettingsStore } from '@/store/settings.js'
const settingsStore = useSettingsStore()
import { requestAnimationTimeout } from '@/utils/timer/requestAnimationTimeout.js'
let showTitle = ref(true)
settingsStore.$subscribe((mutation, state) => {
  if (!state.isCollapseMenu) {
    requestAnimationTimeout(() => {
      showTitle.value = true
    }, 120)
  } else {
    showTitle.value = false
  }
})
</script>
<style lang="scss" scoped>
.app-logo {
  transition: width 0.3s;
}
h1 {
  transition: opacity 0.3s;
}
.collapse-title {
  opacity: 0;
}
</style>
