<template>
  <div class="search pointer">
    <el-tooltip content="菜单搜索" placement="bottom">
      <el-icon style="font-size: 20px"><Search @click="handleSearch" /></el-icon>
    </el-tooltip>
    <el-dialog v-model="isShowSearch" class="header_dialog" width="600px" destroy-on-close :show-close="false">
      <el-select
        style="width: 100%"
        ref="headerSearchSelect"
        v-model="search"
        :remote-method="query"
        filterable
        default-first-option
        remote
        placeholder="菜单搜索 ：支持菜单名称、路径"
        class="header_search_select"
        @change="change">
        <el-option
          v-for="item in options"
          :key="item.item.path"
          :value="item.item.path"
          :label="item.item && item.item.title && item.item.title.length && item.item.title.join(' > ')"></el-option>
      </el-select>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import path from 'path'
import Fuse from 'fuse.js'

import { constantRoutes } from '@/router/index.js'

const router = useRouter()
const search = ref('')
const isShowSearch = ref(false)
const searchPool = ref([])
const options = ref([])
const fuse = ref(null)

const show = () => {
  isShowSearch.value = true
}
/**
 * fuse 实现模糊搜索
 * @param list 需要进行模糊搜索的集合
 */
const fuseInit = (list) => {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

/**
 * 监听 searchPool
 */
watch(searchPool, (list) => {
  fuseInit(list)
})

/**
 * 筛选出可以在侧边栏显示的路由
 * @param routes 路由
 * @param basePath 路径
 * @param prefixTitle 标题
 */
const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  let filterRoutes = []

  for (const route of routes) {
    // 如果路由已经隐藏，跳过这次
    if (route.hidden) {
      continue
    }

    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }

    // 仅推送有标题的路由
    if (route.meta && route.meta.title) {
      data.title = [...data.title, route.meta.title]

      if (route.redirect !== 'noReDirect') {
        filterRoutes.push(data)
      }
    }

    // 循环子路由
    if (route.children) {
      const childRoutes = generateRoutes(route.children, data.path, data.title)
      if (childRoutes.length >= 1) {
        filterRoutes = [...filterRoutes, ...childRoutes]
      }
    }
  }
  return filterRoutes
}

/**
 * 控制搜索框的展示
 */
const handleSearch = () => {
  isShowSearch.value = true
}

onMounted(() => {
  searchPool.value = generateRoutes(JSON.parse(JSON.stringify(constantRoutes)))
})

// 搜索框的远程搜索方法
const query = (queryVal) => {
  if (queryVal !== '') {
    options.value = fuse.value.search(queryVal)
  } else {
    options.value = []
  }
}

/**
 * 输入框填充内容触发该方法
 * @param val 搜索框中输入的值
 */
const change = (val) => {
  if (val) {
    router.push({
      path: val
    })
  }
  options.value = []
  search.value = ''
  isShowSearch.value = false
}

defineExpose({ show })
</script>
<style lang="scss" scoped>
.search {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  :deep(.el-dialog) {
    background-color: #ffffff00;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
    }
  }
  .header_search_select {
    height: 50px;
    :deep(.el-input__wrapper) {
      height: 50px;
    }
  }
}
</style>
