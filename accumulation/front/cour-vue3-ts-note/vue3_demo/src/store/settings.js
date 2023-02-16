import { defineStore } from 'pinia'
import { theme, setting } from '@/config/index.js'
import { setStorage, getStorage } from "@/utils/storage.js";
const { showFullScreen, showSearch, showTheme, headerHeight, asideWidth, isCollapseMenu, colors, asideCollapseWidth, layouts, isFixedHeader } = theme
const { title } = setting

import { useElementPlusChangeTheme } from '@/utils/change-theme/index.js'


export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      title,
      asideWidth,
      asideCollapseWidth,
      headerHeight,
      showSearch,
      showFullScreen,
      layouts,
      colors,
      showTheme,
      isCollapseMenu,
      isFixedHeader,

      isFullScreen: false,
      showPageSearch: false,
      themeColorIndex: 1,
      themeLayoutIndex: 0
    }
  },
  getters: {
    getAsideWidth: (state) => {
      return !state.getIsCollapseMenu ? state.asideWidth : state.asideCollapseWidth
    },
    getAsideMenuScrollbarHeight: (state) => {
      return `calc(100vh - ${state.headerHeight}px)`
    },
    getHeaderHeight: (state) => state.headerHeight,
    getIsFixedHeader: (state) => state.isFixedHeader,
    getShowSearch: (state) => state.showSearch,
    getShowFullScreen: (state) => state.showFullScreen,
    getShowTheme: (state) => state.showTheme,
    getIsCollapseMenu: (state) => state.isCollapseMenu,
    getThemeColor: (state) => colors[state.themeColorIndex],
    getLayoutKey: (state) => layouts[state.themeLayoutIndex].key
  },
  actions: {
    setThemeColor (colorIndex) {
      if (colorIndex || colorIndex === 0) {
        this.themeColorIndex = colorIndex
        setStorage('themeColorIndex', colorIndex)
      } else {
        this.themeColorIndex = getStorage('themeColorIndex') || 0
      }
      useElementPlusChangeTheme(this.getThemeColor.color)
    },
    setThemeLayout (colorIndex) {
      if (colorIndex || colorIndex === 0) {
        this.themeColorIndex = colorIndex
        setStorage('themeColorIndex', colorIndex)
      } else {
        this.themeColorIndex = getStorage('themeColorIndex') || 0
      }
      useElementPlusChangeTheme(this.getThemeColor.color)
    }
  }
})
