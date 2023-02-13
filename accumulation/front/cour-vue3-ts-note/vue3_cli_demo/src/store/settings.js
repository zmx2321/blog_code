import { defineStore } from 'pinia'
import { theme, setting } from '@/config/index.js'

const { showFullScreen, showSearch, showTheme, headerHeight, asideWidth, isCollapseMenu, colors, asideCollapseWidth } = theme
const { title } = setting

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      title,
      asideWidth,
      asideCollapseWidth,
      headerHeight,
      showSearch,
      showFullScreen,
      showTheme,
      isCollapseMenu,
      colors,

      isFullScreen: false,
      showPageSearch: false,
      themeColorIndex: 0
    }
  },
  getters: {
    getAsideWidth: (state) => {
      return !state.getIsCollapseMenu ? state.asideWidth : state.asideCollapseWidth
    },
    getHeaderHeight: (state) => state.headerHeight,
    getShowSearch: (state) => state.showSearch,
    getShowFullScreen: (state) => state.showFullScreen,
    getShowTheme: (state) => state.showTheme,
    getIsCollapseMenu: (state) => state.isCollapseMenu,
    getThemeColor: (state) => colors[state.themeColorIndex]
  },
  mutations: {},
  actions: {}
})
