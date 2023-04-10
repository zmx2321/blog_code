<template>
  <template v-for="(item, index) in props.data" :key="index">
    <template v-if="!item?.meta?.hidden">
      <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path" :key="item.path">
        <template #title>
          <el-icon>
            <SvgIcon :name="item?.meta?.icon" v-if="item?.meta.icon" class="ft24 pointer"></SvgIcon>
          </el-icon>

          <span class="ft16" :style="{ marginLeft: item?.meta.icon ? '16px' : '40px' }">{{ item?.meta?.title }}</span>
        </template>
        <RecursionMenu :data="item.children" :isSubMenu="true"></RecursionMenu>
      </el-sub-menu>
      <template v-else>
        <el-menu-item
          :index="item.path"
          class="pointer"
          @click="handleLink(item)"
          :key="item.path"
          :default-active="activeMenuPath"
          v-if="getAuth(item)">
          <!-- v-if="item.path !== '/collect/my-report' || getAuth()" -->
          <template #title>
            <SvgIcon
              :name="item.path === activeMenuPath ? 'menu-point-hl' : 'menu-point'"
              style="font-size: 8px; margin-left: 22px"
              v-if="isSubMenu"></SvgIcon>
            <span
              class="ft16"
              :style="{ marginLeft: isSubMenu ? '10px' : '40px', color: item.path !== activeMenuPath && isSubMenu ? '#A8ABB2' : '' }">
              {{ item?.meta?.title }}
            </span>
            <el-tag v-if="item.meta && item.meta.badge" type="danger" effect="dark">
              {{ item?.meta?.badge }}
            </el-tag>
          </template>
        </el-menu-item>
      </template>
    </template>
  </template>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { isExternal } from '@/utils/validate'
import { getStorage } from '@/utils/storage.js'
import { computed } from 'vue'
const needAdmin = true

const props = defineProps({
  data: Array,
  isSubMenu: Boolean
})
const route = useRoute()
const router = useRouter()

const getAuth = (item) => {
  return !needAdmin || getStorage('userInfo').roles.includes('admin') || item.path !== '/collect/my-report'
}

const activeMenuPath = computed(() => {
  const { meta, path } = route
  if (meta.activeMenuPath) {
    return meta.activeMenuPath
  }
  return path
})

// 点击判断是否跳转外部连接
function handleLink(item) {
  const routePath = item.path
  const target = item.meta.target
  if (target === '_blank') {
    if (isExternal(routePath)) {
      window.open(routePath)
    } else {
      router.push({ name: item.name })
    }
  } else {
    if (isExternal(routePath)) {
      window.location.href = routePath
    } else {
      router.push({ name: item.name })
    }
  }
}
</script>
