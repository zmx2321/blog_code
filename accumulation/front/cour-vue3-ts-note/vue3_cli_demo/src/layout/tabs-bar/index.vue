<template>
  <div id="tabs-bar-container"
       class="tabs-bar-container">
    <el-tabs v-model="tabActive"
             type="card"
             class="tabs-content"
             @tab-click="handleTabClick"
             @tab-remove="handleTabRemove">
      <el-tab-pane v-for="item in tagsStore.getVisitedRoutes"
                   :key="item.path"
                   :label="item.meta.title"
                   :name="item.path"
                   :closable="!isAffix(item)"></el-tab-pane>
    </el-tabs>
    <el-dropdown @command="handleCommand">
      <span style="cursor: pointer">
        <SvgIcon name="tagsbar-menu"
                 color="#9a9a9a"
                 class="ft24 pointer animate menu-icon"></SvgIcon>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="tabs-more">
          <el-dropdown-item command="closeOtherstabs">
            <el-icon>
              <Close />
            </el-icon>
            关闭其他
          </el-dropdown-item>
          <el-dropdown-item command="closeLefttabs">
            <el-icon>
              <Back />
            </el-icon>
            关闭左侧
          </el-dropdown-item>
          <el-dropdown-item command="closeRighttabs">
            <el-icon>
              <Right />
            </el-icon>
            关闭右侧
          </el-dropdown-item>
          <el-dropdown-item command="closeAlltabs">
            <el-icon>
              <Close />
            </el-icon>
            关闭全部
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
import { ref, toRefs, reactive, watch } from 'vue'
import { useRoutesStore } from "@/store/routes.js";
import { useTagsStore } from "@/store/tags.js";
import { useRouter, useRoute } from 'vue-router'
const tagsStore = useTagsStore()
const routesStore = useRoutesStore()
const router = useRouter()
const route = useRoute()

let tabActive = ref('')
let affixtabs = ref([])

function handleTabClick (tab) {
  const subRoute = tagsStore.getVisitedRoutes.filter((item, index) => {
    if (tab.index == index) return item
  })[0]
  if (route.path !== subRoute.path) {
    router.push({
      fullPath: subRoute.fullPath,
      path: subRoute.path,
      name: subRoute.name,
      meta: { ...subRoute.meta },
    })
  } else {
    return false
  }
}

async function handleTabRemove (tabActive) {
  let view
  tagsStore.getVisitedRoutes.forEach((item, index) => {
    if (tabActive == item.path) {
      view = item
    }
  })
  const { visitedRoutes } = await tagsStore.delRoute(view)
  if (isActive(view)) {
    toLastTag(visitedRoutes, view)
  }
}

function isActive (route) {
  return route.path === route.path
}

function isAffix (tag) {
  return tag.meta && tag.meta.affix
}

function filterAffixtabs (routes, basePath = '/') {
  let tabs = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tabs.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const temptabs = filterAffixtabs(route.children, route.path)
      if (temptabs.length >= 1) {
        tabs = [...tabs, ...temptabs]
      }
    }
  })
  return tabs
}

function inittabs () {
  affixtabs.value = filterAffixtabs(routesStore.routes)
  for (const tag of affixtabs.value) {
    if (tag.name) {
      tagsStore.addVisitedRoute(tag)
    }
  }
}

function addtabs () {
  if (route.name) {
    tagsStore.addVisitedRoute(route)
  }
  return false
}


function handleCommand (command) {
  switch (command) {
    case 'refreshRoute':
      refreshRoute()
      break
    case 'closeOtherstabs':
      closeOtherstabs()
      break
    case 'closeLefttabs':
      closeLefttabs()
      break
    case 'closeRighttabs':
      closeRighttabs()
      break
    case 'closeAlltabs':
      closeAlltabs()
      break
  }
}
async function refreshRoute () {
  // this.$baseEventBus.$emit('reloadrouter-view')
}
async function closeSelectedTag (view) {
  const { visitedRoutes } = await tagsStore.delRoute(view)
  if (isActive(view)) {
    toLastTag(visitedRoutes, view)
  }
}
async function closeOtherstabs () {
  const view = await toThisTag()
  await tagsStore.delOthersRoutes(view)
}
async function closeLefttabs () {
  const view = await toThisTag()
  await tagsStore.delLeftRoutes(view)
}
async function closeRighttabs () {
  const view = await toThisTag()
  await tagsStore.delRightRoutes(view)
}
async function closeAlltabs () {
  const view = await toThisTag()
  const { visitedRoutes } = await tagsStore.delAllRoutes()
  if (affixtabs.value.some((tag) => tag.path === view.path)) {
    return
  }
  toLastTag(visitedRoutes, view)
}
function toLastTag (visitedRoutes, view) {
  const latestView = visitedRoutes.slice(-1)[0]
  if (latestView) {
    router.push(latestView)
  } else {
    router.push('/')
  }
}

async function toThisTag () {
  const view = tagsStore.getVisitedRoutes.filter((item, index) => {
    if (item.path === route.fullPath) {
      return item
    }
  })[0]
  if (route.path !== view.path) router.push(view)
  return view
}
// 监听当前路由
watch(
  () => router.currentRoute.value,
  (newValue) => {
    inittabs()
    addtabs()

    tagsStore.getVisitedRoutes.forEach((item, index) => {
      if (item.path === route.path) {
        tabActive.value = item.path
      }
    })
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
.animate {
  transition: transform 0.2s;
}
.turn-rotate {
  transform: rotateY(180deg);
}

.menu-icon:hover {
  color: var(--el-color-primary) !important;
  transform: rotate(45deg);
}

//默认paddiing
$base-padding: 20px;
$base-color-white: #fff;
$base-border-radius: 4px;
$base-border-color: #dcdfe6;

//顶部多标签页tabs-bar的高度
$base-tabs-bar-height: 50px;
//顶部多标签页tabs-bar中每一个item的高度
$base-tag-item-height: 34px;

.tabs-bar-container {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding-right: 20px;
  padding-left: 20px;
  user-select: none;
  background: #fff;
  border-top: 1px solid #f6f6f6;

  :deep {
    .fold-unfold {
      margin-right: $base-padding;
    }
  }
  .tabs-content {
    width: calc(100% - 90px);
    height: $base-tag-item-height;

    :deep {
      .el-tabs__nav-next,
      .el-tabs__nav-prev {
        height: $base-tag-item-height;
        line-height: $base-tag-item-height;
      }

      .el-tabs__header {
        border-bottom: 0;

        .el-tabs__nav {
          border: 0;
        }

        .el-tabs__item {
          box-sizing: border-box;
          height: $base-tag-item-height;
          margin-right: 5px;
          line-height: $base-tag-item-height;
          border: 1px solid $base-border-color;
          border-radius: $base-border-radius;
          transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
          background-color: #fafafa;
          border: 0;
          &.is-active {
            // border: 1px solid var(--el-color-primary);
            color: var(--el-color-primary);
            background-color: #ecf5ff;
            border: 0;
          }
        }
      }
    }
  }

  .more {
    display: flex;
    align-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>