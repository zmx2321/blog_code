<template>
  <div class="main-content relative" :style="{ height: `calc(${settingsStore.getAsideMenuScrollbarHeight} - 50px - 40px)` }">
    <router-view v-slot="{ Component }">
      <keep-alive :include="includeList">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script setup>
import { useSettingsStore } from '@/store/settings.js'
import { reactive, watch, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const settingsStore = useSettingsStore()

const includeList = reactive([])
const route = useRoute()
// const router = useRouter()
watch(
  () => route,
  (newVal, oldVal) => {
    if (newVal.meta.keepAlive && includeList.indexOf(newVal.name) === -1) {
      includeList.push(newVal.name)
    }
  },
  { deep: true }
) // 开启深度监听
</script>
<style lang="scss" scoped>
.main-content {
  max-width: calc(100vw - 40px - 50px);
  overflow-x: auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
}
</style>
