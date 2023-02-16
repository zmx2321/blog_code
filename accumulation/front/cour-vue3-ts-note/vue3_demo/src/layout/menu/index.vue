<template>
  <el-menu class="aside-menu"
           default-active="2"
           :collapse="settingsStore.isCollapseMenu"
           background-color="#ffffff00"
           :text-color="settingsStore.getThemeColor.menuTextColor"
           active-text-color="#ffffff">
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <Location />
        </el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3"
                  disabled>
      <el-icon>
        <Document />
      </el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <Setting />
      </el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>
<script setup>
import { ref, toRefs, reactive } from 'vue'
import { Location, Document, Setting } from '@element-plus/icons-vue'
import { useSettingsStore } from '@/store/settings.js'
const settingsStore = useSettingsStore()
</script>
<style lang="scss" scoped></style>
