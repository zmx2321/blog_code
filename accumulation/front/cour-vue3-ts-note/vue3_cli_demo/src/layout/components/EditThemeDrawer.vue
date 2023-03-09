<template>
  <el-drawer v-model="showDrawer"
             direction="rtl"
             size="288px">
    <template #header>
      <h1 class="ft16 fw400"
          style="color: #72767b">主题配置</h1>
    </template>
    <template #default>
      <el-form :model="form"
               label-width="88px"
               label-position="left">
        <el-form-item label="布局">
          <el-select v-model="form.themeLayoutIndex"
                     placeholder="请选择主题"
                     @change="changeThemeLayout">
            <el-option :label="item.title"
                       :value="index"
                       v-for="(item, index) in settingStore.layouts"
                       :key="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="主题">
          <el-select v-model="form.themeColorIndex"
                     placeholder="请选择主题"
                     @change="changeThemeColor">
            <el-option :label="item.title"
                       :value="index"
                       v-for="(item, index) in settingStore.colors"
                       :key="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="头部固定">
          <el-switch v-model="form.isFixedHeader"
                     @change="changeFixedHeader" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div flex="main:center">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary"
                   @click="confirmClick">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup>
import { ref, toRefs, reactive } from 'vue'
import { useSettingsStore } from '@/store/settings.js'
const settingStore = useSettingsStore()
const showDrawer = ref(false)
const form = ref({
  themeColorIndex: settingStore.themeColorIndex,
  themeLayoutIndex: settingStore.themeLayoutIndex,
  isFixedHeader: settingStore.isFixedHeader,
})

function changeThemeColor () {
  settingStore.setThemeColor(form.value.themeColorIndex)
}

function changeThemeLayout () {
  settingStore.setThemeLayout(form.value.themeColorIndex)
}

function changeFixedHeader () {
  settingStore.isFixedHeader = form.value.isFixedHeader
}

function show () {
  showDrawer.value = true
}
function cancelClick () {
  showDrawer.value = false
}
function confirmClick () {
  // settingStore.$patch(Object.assign(settingStore, form))
  showDrawer.value = false
}

defineExpose({ show, cancelClick })
</script>
<style lang="scss" scoped></style>
