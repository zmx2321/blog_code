<template>
  <div class="common-layout">
    <el-container>
      <el-header style="backgroundColor: #fff;border-bottom: 2px solid #DCDFE6;padding-left: 0;">
        <Header></Header>
      </el-header>
      <el-container>
        <Aside></Aside>
        <div style="flex:1">
          <TabsBar></TabsBar>
          <el-main>
            <Main></Main>
          </el-main>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Main from './main/index.vue'
import Aside from './aside/index.vue'
import Header from './header/index.vue'
import TabsBar from './tabs-bar/index.vue'
import { ref, toRefs, reactive, onMounted } from 'vue'
import { useSettingsStore } from "@/store/settings.js";
const settingsStore = useSettingsStore()
onMounted(() => {
  settingsStore.setThemeColor()
})
</script>
<style lang="scss" scoped></style>
