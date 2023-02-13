<template>
  <div class="app-logo pointer" flex="main:center cross:center" :style="{ height: settingStore.getHeaderHeight + 'px' }">
    <el-image style="width: 40px; height: 40px" src="https://img.tukuppt.com/photo-big/00/00/94/6152bc0ce6e5d805.jpg" />
    <!-- <h1 style="margin-left: 20px" class="ft32" :class="settingStore.getIsCollapseMenu && 'collapse-title'">{{ settingStore.title }}</h1> -->
    <h1 style="margin-left: 20px" class="ft32" v-if="showTitle">{{ settingStore.title }}</h1>
  </div>
</template>
<script setup>
import { ref, toRefs, reactive } from 'vue'
import { useSettingsStore } from '@/store/settings.js'
const settingStore = useSettingsStore()
import { requestAnimationTimeout } from '@/utils/requestAnimationTimeout.js'
let showTitle = ref(true)
settingStore.$subscribe((mutation, state) => {
  if (!state.isCollapseMenu) {
    requestAnimationTimeout(() => {
      showTitle.value = true
    }, 60)
  } else {
    showTitle.value = false
  }
})
</script>
<style lang="scss" scoped>
h1 {
  transition: opacity 0.2s;
}
.collapse-title {
  opacity: 0;
}
</style>
