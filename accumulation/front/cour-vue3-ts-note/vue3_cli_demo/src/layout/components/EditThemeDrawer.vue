<template>
  <el-drawer v-model="showDrawer" direction="rtl" size="288px">
    <template #header>
      <h1 class="ft16 fw400" style="color: #72767b">主题配置</h1>
    </template>
    <template #default>
      <el-form :model="form" label-width="88px" label-position="left">
        <el-form-item label="主题">
          <el-select v-model="form.themeColorIndex" placeholder="请选择主题" @change="changeThemeColor">
            <el-option :label="item.title" :value="index" v-for="(item, index) in settingStore.colors" :key="index" />
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div flex="main:center">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup>
import { ref, toRefs, reactive } from 'vue'
import { useSettingsStore } from '@/store/settings.js'
import { useElementPlusChangeTheme } from '@/utils/change-theme/index.js'
const settingStore = useSettingsStore()
const showDrawer = ref(false)
const form = ref({
  themeColorIndex: settingStore.themeColorIndex
})

function changeThemeColor() {
  settingStore.themeColorIndex = form.value.themeColorIndex
  useElementPlusChangeTheme(settingStore.getThemeColor.color)
}
function show() {
  showDrawer.value = true
}
function cancelClick() {
  showDrawer.value = false
}
function confirmClick() {
  // settingStore.$patch(Object.assign(settingStore, form))
  showDrawer.value = false
}

defineExpose({ show, cancelClick })
</script>
<style lang="scss" scoped></style>
